<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductCategory::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name->vi', 'like', '%' . $search . '%')
                  ->orWhere('name->en', 'like', '%' . $search . '%')
                  ->orWhere('slug', 'like', '%' . $search . '%');
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $categories = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('ProductCategories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    public function create()
    {
        return Inertia::render('ProductCategories/Form', [
            'category' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:food,cosmetic'],
            'slug' => ['nullable', 'string', 'max:255'],
        ]);

        if (empty($validated['name']['en'])) {
            $validated['name']['en'] = $validated['name']['vi'];
        }

        // Generate slug
        $baseSlug = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($validated['name']['vi']);
        if (empty($baseSlug)) {
            $baseSlug = 'category';
        }
        $slug = $baseSlug;
        $count = 1;
        while (ProductCategory::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        $category = ProductCategory::create($validated);

        ActivityLogger::log('create_product_category', "Đã tạo danh mục sản phẩm mới ID: {$category->id}, tên: {$category->name['vi']}");

        return redirect()->route('admin.product-categories.index')
            ->with('success', 'Danh mục sản phẩm đã được tạo thành công!');
    }

    public function edit(ProductCategory $productCategory)
    {
        return Inertia::render('ProductCategories/Form', [
            'category' => $productCategory,
        ]);
    }

    public function update(Request $request, ProductCategory $productCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:food,cosmetic'],
            'slug' => ['nullable', 'string', 'max:255'],
        ]);

        if (empty($validated['name']['en'])) {
            $validated['name']['en'] = $validated['name']['vi'];
        }

        // Generate unique slug
        $baseSlug = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($validated['name']['vi']);
        if (empty($baseSlug)) {
            $baseSlug = 'category';
        }
        $slug = $baseSlug;
        $count = 1;
        while (ProductCategory::where('slug', $slug)->where('id', '!=', $productCategory->id)->exists()) {
            $slug = $baseSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        $productCategory->update($validated);

        ActivityLogger::log('update_product_category', "Đã cập nhật danh mục sản phẩm ID: {$productCategory->id}");

        return redirect()->route('admin.product-categories.index')
            ->with('success', 'Danh mục sản phẩm đã được cập nhật thành công!');
    }

    public function destroy(ProductCategory $productCategory)
    {
        $id = $productCategory->id;
        $nameVi = $productCategory->name['vi'] ?? '';
        $productCategory->delete();

        ActivityLogger::log('delete_product_category', "Đã xóa danh mục sản phẩm ID: {$id}, tên: {$nameVi}");

        return redirect()->route('admin.product-categories.index')
            ->with('success', 'Danh mục sản phẩm đã được xóa thành công!');
    }
}

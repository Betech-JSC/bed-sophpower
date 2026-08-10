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
        $query = ProductCategory::whereNull('parent_id');

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

        $categories = $query->with(['children.children'])->withCount('children')->orderBy('sort_order', 'asc')->orderBy('id', 'asc')->paginate(10)->withQueryString();

        return Inertia::render('ProductCategories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    public function updateSortOrder(Request $request, ProductCategory $productCategory)
    {
        $validated = $request->validate([
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $productCategory->update([
            'sort_order' => $validated['sort_order'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật thứ tự hiển thị thành công!',
        ]);
    }

    public function storeBulkChildren(Request $request, ProductCategory $productCategory)
    {
        $request->validate([
            'items' => ['required', 'array', 'min:1'],
            'items.*.name.vi' => ['required', 'string', 'max:255'],
            'items.*.name.en' => ['nullable', 'string', 'max:255'],
            'items.*.slug' => ['nullable', 'string', 'max:255'],
        ]);

        $items = $request->input('items');
        $forceSave = $request->boolean('force_save');

        $conflicts = [];
        $validItems = [];

        foreach ($items as $index => $item) {
            $viName = trim($item['name']['vi'] ?? '');
            if (empty($viName)) continue;

            // Check if category with same VI name already exists
            $existing = ProductCategory::where('name->vi', $viName)->with('parent')->first();

            if ($existing) {
                $existingParentName = $existing->parent ? ($existing->parent->name['vi'] ?? 'Danh mục khác') : 'Danh mục Gốc';
                $conflicts[] = [
                    'index' => $index,
                    'name_vi' => $viName,
                    'existing_id' => $existing->id,
                    'existing_parent_name' => $existingParentName,
                ];
            }

            $validItems[] = $item;
        }

        // If conflicts found and not forcing save, alert user with conflict list
        if (!empty($conflicts) && !$forceSave) {
            return response()->json([
                'has_conflicts' => true,
                'conflicts' => $conflicts,
                'message' => 'Phát hiện một số danh mục đã tồn tại trong hệ thống.',
            ], 422);
        }

        // Save items
        $createdCount = 0;
        foreach ($validItems as $item) {
            $viName = trim($item['name']['vi']);
            $enName = trim($item['name']['en'] ?? '') ?: $viName;

            // Generate slug
            $baseSlug = !empty($item['slug']) ? Str::slug($item['slug']) : Str::slug($viName);
            if (empty($baseSlug)) {
                $baseSlug = 'category';
            }
            $slug = $baseSlug;
            $count = 1;
            while (ProductCategory::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count++;
            }

            ProductCategory::create([
                'name' => ['vi' => $viName, 'en' => $enName],
                'slug' => $slug,
                'type' => $productCategory->type,
                'parent_id' => $productCategory->id,
            ]);
            $createdCount++;
        }

        ActivityLogger::log('bulk_create_product_categories', "Đã thêm hàng loạt {$createdCount} danh mục con cho danh mục cha ID: {$productCategory->id}");

        return redirect()->route('admin.product-categories.index')
            ->with('success', "Đã thêm thành công {$createdCount} danh mục con!");
    }

    public function create()
    {
        $parentCategories = ProductCategory::orderBy('name->vi', 'asc')->get();
        return Inertia::render('ProductCategories/Form', [
            'category' => null,
            'parentCategories' => $parentCategories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:food,cosmetic'],
            'parent_id' => ['nullable', 'exists:product_categories,id'],
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

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'category' => $category,
                'message' => 'Danh mục sản phẩm đã được tạo thành công!',
            ]);
        }

        return redirect()->route('admin.product-categories.index')
            ->with('success', 'Danh mục sản phẩm đã được tạo thành công!');
    }

    public function edit(ProductCategory $productCategory)
    {
        $productCategory->load(['children.children']);

        $parentCategories = ProductCategory::where('id', '!=', $productCategory->id)
            ->orderBy('name->vi', 'asc')
            ->get();

        return Inertia::render('ProductCategories/Form', [
            'category' => $productCategory,
            'parentCategories' => $parentCategories,
        ]);
    }

    public function update(Request $request, ProductCategory $productCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:food,cosmetic'],
            'parent_id' => ['nullable', 'exists:product_categories,id', 'different:' . $productCategory->id],
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

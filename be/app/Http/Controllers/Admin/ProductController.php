<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('productCategory');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name->vi', 'like', '%' . $search . '%')
                  ->orWhere('name->en', 'like', '%' . $search . '%')
                  ->orWhereHas('productCategory', function($subQuery) use ($search) {
                      $subQuery->where('name->vi', 'like', '%' . $search . '%')
                               ->orWhere('name->en', 'like', '%' . $search . '%');
                  });
              });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('category_id')) {
            $query->where('product_category_id', $request->category_id);
        }

        $products = $query->latest('id')->paginate(10)->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => ProductCategory::orderBy('sort_order', 'asc')->get(),
            'filters' => $request->only(['search', 'type', 'category_id']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Form', [
            'product' => null,
            'categories' => ProductCategory::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'product_category_id' => ['required', 'exists:product_categories,id'],
            'desc' => ['required', 'array'],
            'desc.vi' => ['required', 'string'],
            'desc.en' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'image' => ['nullable', 'string'],
            'specs' => ['nullable', 'array'],
            'specs.vi' => ['nullable', 'array'],
            'specs.en' => ['nullable', 'array'],
            'applications' => ['nullable', 'array'],
            'applications.vi' => ['nullable', 'array'],
            'applications.en' => ['nullable', 'array'],
            'packaging' => ['required', 'array'],
            'packaging.vi' => ['required', 'string'],
            'packaging.en' => ['nullable', 'string'],
            'type' => ['nullable', 'string', 'max:255'],
            'seo_title' => ['nullable', 'array'],
            'seo_title.vi' => ['nullable', 'string', 'max:255'],
            'seo_title.en' => ['nullable', 'string', 'max:255'],
            'seo_desc' => ['nullable', 'array'],
            'seo_desc.vi' => ['nullable', 'string'],
            'seo_desc.en' => ['nullable', 'string'],
            'seo_keywords' => ['nullable', 'array'],
            'seo_keywords.vi' => ['nullable', 'string'],
            'seo_keywords.en' => ['nullable', 'string'],
            'meta_robots' => ['nullable', 'string', 'max:255'],
            'canonical_url' => ['nullable', 'string', 'max:255'],
            'og_image_file' => ['nullable', 'image', 'max:2048'],
            'og_image' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:draft,published'],
        ]);

        if (empty($validated['name']['en'])) {
            $validated['name']['en'] = $validated['name']['vi'];
        }
        if (empty($validated['desc']['en'])) {
            $validated['desc']['en'] = $validated['desc']['vi'];
        }
        if (empty($validated['packaging']['en'])) {
            $validated['packaging']['en'] = $validated['packaging']['vi'];
        }

        // Keep database column 'category' and 'type' populated from ProductCategory
        $category = ProductCategory::find($validated['product_category_id']);
        $validated['category'] = $category ? $category->name : ['vi' => '', 'en' => ''];
        if (empty($validated['type'])) {
            $validated['type'] = $category->type ?? 'food';
        }

        // Generate unique slug
        $baseSlug = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($validated['name']['vi']);
        if (empty($baseSlug)) {
            $baseSlug = 'product';
        }
        $slug = $baseSlug;
        $count = 1;
        while (Product::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('og_image_file')) {
            $path = $request->file('og_image_file')->store('seo', 'public');
            $validated['og_image'] = '/storage/' . $path;
        }

        unset($validated['image_file']);
        unset($validated['og_image_file']);

        Product::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Sản phẩm đã được tạo thành công!');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Form', [
            'product' => $product,
            'categories' => ProductCategory::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'product_category_id' => ['required', 'exists:product_categories,id'],
            'desc' => ['required', 'array'],
            'desc.vi' => ['required', 'string'],
            'desc.en' => ['nullable', 'string'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'image' => ['nullable', 'string'],
            'specs' => ['nullable', 'array'],
            'specs.vi' => ['nullable', 'array'],
            'specs.en' => ['nullable', 'array'],
            'applications' => ['nullable', 'array'],
            'applications.vi' => ['nullable', 'array'],
            'applications.en' => ['nullable', 'array'],
            'packaging' => ['required', 'array'],
            'packaging.vi' => ['required', 'string'],
            'packaging.en' => ['nullable', 'string'],
            'type' => ['nullable', 'string', 'max:255'],
            'seo_title' => ['nullable', 'array'],
            'seo_title.vi' => ['nullable', 'string', 'max:255'],
            'seo_title.en' => ['nullable', 'string', 'max:255'],
            'seo_desc' => ['nullable', 'array'],
            'seo_desc.vi' => ['nullable', 'string'],
            'seo_desc.en' => ['nullable', 'string'],
            'seo_keywords' => ['nullable', 'array'],
            'seo_keywords.vi' => ['nullable', 'string'],
            'seo_keywords.en' => ['nullable', 'string'],
            'meta_robots' => ['nullable', 'string', 'max:255'],
            'canonical_url' => ['nullable', 'string', 'max:255'],
            'og_image_file' => ['nullable', 'image', 'max:2048'],
            'og_image' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:draft,published'],
        ]);

        if (empty($validated['name']['en'])) {
            $validated['name']['en'] = $validated['name']['vi'];
        }
        if (empty($validated['desc']['en'])) {
            $validated['desc']['en'] = $validated['desc']['vi'];
        }
        if (empty($validated['packaging']['en'])) {
            $validated['packaging']['en'] = $validated['packaging']['vi'];
        }

        // Keep database column 'category' populated for constraints and fallbacks
        $category = ProductCategory::find($validated['product_category_id']);
        $validated['category'] = $category ? $category->name : ['vi' => '', 'en' => ''];
        if (empty($validated['type'])) {
            $validated['type'] = $category->type ?? $product->type ?? 'food';
        }

        // Generate unique slug
        $baseSlug = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($validated['name']['vi']);
        if (empty($baseSlug)) {
            $baseSlug = 'product';
        }
        $slug = $baseSlug;
        $count = 1;
        while (Product::where('slug', $slug)->where('id', '!=', $product->id)->exists()) {
            $slug = $baseSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('image_file')) {
            // Delete old image if it's in storage
            if ($product->image && str_starts_with($product->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $product->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image_file')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            if (is_null($request->input('image'))) {
                // Delete old image if it's in storage
                if ($product->image && str_starts_with($product->image, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $product->image);
                    Storage::disk('public')->delete($oldPath);
                }
                $validated['image'] = null;
            } else {
                $validated['image'] = $request->input('image');
            }
        }

        if ($request->hasFile('og_image_file')) {
            // Delete old og_image if it's in storage
            if ($product->og_image && str_starts_with($product->og_image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $product->og_image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('og_image_file')->store('seo', 'public');
            $validated['og_image'] = '/storage/' . $path;
        } else {
            if (is_null($request->input('og_image'))) {
                // Delete old og_image if it's in storage
                if ($product->og_image && str_starts_with($product->og_image, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $product->og_image);
                    Storage::disk('public')->delete($oldPath);
                }
                $validated['og_image'] = null;
            } else {
                $validated['og_image'] = $request->input('og_image');
            }
        }

        unset($validated['image_file']);
        unset($validated['og_image_file']);

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Sản phẩm đã được cập nhật thành công!');
    }

    public function destroy(Product $product)
    {
        if ($product->image && str_starts_with($product->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $product->image);
            Storage::disk('public')->delete($oldPath);
        }

        if ($product->og_image && str_starts_with($product->og_image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $product->og_image);
            Storage::disk('public')->delete($oldPath);
        }

        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Sản phẩm đã được xóa thành công!');
    }
}

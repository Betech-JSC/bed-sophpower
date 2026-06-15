<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name->vi', 'like', '%' . $search . '%')
                  ->orWhere('name->en', 'like', '%' . $search . '%')
                  ->orWhere('category->vi', 'like', '%' . $search . '%')
                  ->orWhere('category->en', 'like', '%' . $search . '%');
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $products = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Form', [
            'product' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'array'],
            'category.vi' => ['required', 'string', 'max:255'],
            'category.en' => ['nullable', 'string', 'max:255'],
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
            'type' => ['required', 'in:food,cosmetic'],
        ]);

        if (empty($validated['name']['en'])) {
            $validated['name']['en'] = $validated['name']['vi'];
        }
        if (empty($validated['category']['en'])) {
            $validated['category']['en'] = $validated['category']['vi'];
        }
        if (empty($validated['desc']['en'])) {
            $validated['desc']['en'] = $validated['desc']['vi'];
        }
        if (empty($validated['packaging']['en'])) {
            $validated['packaging']['en'] = $validated['packaging']['vi'];
        }

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        unset($validated['image_file']);

        Product::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Sản phẩm đã được tạo thành công!');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Form', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'array'],
            'category.vi' => ['required', 'string', 'max:255'],
            'category.en' => ['nullable', 'string', 'max:255'],
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
            'type' => ['required', 'in:food,cosmetic'],
        ]);

        if (empty($validated['name']['en'])) {
            $validated['name']['en'] = $validated['name']['vi'];
        }
        if (empty($validated['category']['en'])) {
            $validated['category']['en'] = $validated['category']['vi'];
        }
        if (empty($validated['desc']['en'])) {
            $validated['desc']['en'] = $validated['desc']['vi'];
        }
        if (empty($validated['packaging']['en'])) {
            $validated['packaging']['en'] = $validated['packaging']['vi'];
        }

        if ($request->hasFile('image_file')) {
            // Delete old image if it's in storage
            if ($product->image && str_starts_with($product->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $product->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image_file')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            $validated['image'] = $product->image;
        }

        unset($validated['image_file']);

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

        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Sản phẩm đã được xóa thành công!');
    }
}

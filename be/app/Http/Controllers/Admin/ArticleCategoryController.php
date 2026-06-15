<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ArticleCategory;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = ArticleCategory::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name->vi', 'like', '%' . $search . '%')
                  ->orWhere('name->en', 'like', '%' . $search . '%')
                  ->orWhere('slug', 'like', '%' . $search . '%');
            });
        }

        $categories = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('ArticleCategories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('ArticleCategories/Form', [
            'category' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
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
        while (ArticleCategory::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        $category = ArticleCategory::create($validated);

        ActivityLogger::log('create_article_category', "Đã tạo danh mục bài viết mới ID: {$category->id}, tên: {$category->name['vi']}");

        return redirect()->route('admin.article-categories.index')
            ->with('success', 'Danh mục bài viết đã được tạo thành công!');
    }

    public function edit(ArticleCategory $articleCategory)
    {
        return Inertia::render('ArticleCategories/Form', [
            'category' => $articleCategory,
        ]);
    }

    public function update(Request $request, ArticleCategory $articleCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.vi' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
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
        while (ArticleCategory::where('slug', $slug)->where('id', '!=', $articleCategory->id)->exists()) {
            $slug = $baseSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        $articleCategory->update($validated);

        ActivityLogger::log('update_article_category', "Đã cập nhật danh mục bài viết ID: {$articleCategory->id}");

        return redirect()->route('admin.article-categories.index')
            ->with('success', 'Danh mục bài viết đã được cập nhật thành công!');
    }

    public function destroy(ArticleCategory $articleCategory)
    {
        $id = $articleCategory->id;
        $nameVi = $articleCategory->name['vi'] ?? '';
        $articleCategory->delete();

        ActivityLogger::log('delete_article_category', "Đã xóa danh mục bài viết ID: {$id}, tên: {$nameVi}");

        return redirect()->route('admin.article-categories.index')
            ->with('success', 'Danh mục bài viết đã được xóa thành công!');
    }
}

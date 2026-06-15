<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title->vi', 'like', '%' . $search . '%')
                  ->orWhere('title->en', 'like', '%' . $search . '%')
                  ->orWhere('category->vi', 'like', '%' . $search . '%')
                  ->orWhere('category->en', 'like', '%' . $search . '%');
            });
        }

        $articles = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('News/Index', [
            'articles' => $articles,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('News/Form', [
            'article' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'array'],
            'title.vi' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'summary' => ['required', 'array'],
            'summary.vi' => ['required', 'string'],
            'summary.en' => ['nullable', 'string'],
            'content' => ['required', 'array'],
            'content.vi' => ['required', 'string'],
            'content.en' => ['nullable', 'string'],
            'date' => ['required', 'date'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'image' => ['nullable', 'string'],
            'category' => ['required', 'array'],
            'category.vi' => ['required', 'string', 'max:255'],
            'category.en' => ['nullable', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
        ]);

        if (empty($validated['title']['en'])) {
            $validated['title']['en'] = $validated['title']['vi'];
        }
        if (empty($validated['summary']['en'])) {
            $validated['summary']['en'] = $validated['summary']['vi'];
        }
        if (empty($validated['content']['en'])) {
            $validated['content']['en'] = $validated['content']['vi'];
        }
        if (empty($validated['category']['en'])) {
            $validated['category']['en'] = $validated['category']['vi'];
        }

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('news', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        unset($validated['image_file']);

        Article::create($validated);

        return redirect()->route('admin.news.index')
            ->with('success', 'Bài viết đã được tạo thành công!');
    }

    public function edit(Article $article)
    {
        return Inertia::render('News/Form', [
            'article' => $article,
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => ['required', 'array'],
            'title.vi' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'summary' => ['required', 'array'],
            'summary.vi' => ['required', 'string'],
            'summary.en' => ['nullable', 'string'],
            'content' => ['required', 'array'],
            'content.vi' => ['required', 'string'],
            'content.en' => ['nullable', 'string'],
            'date' => ['required', 'date'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'image' => ['nullable', 'string'],
            'category' => ['required', 'array'],
            'category.vi' => ['required', 'string', 'max:255'],
            'category.en' => ['nullable', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
        ]);

        if (empty($validated['title']['en'])) {
            $validated['title']['en'] = $validated['title']['vi'];
        }
        if (empty($validated['summary']['en'])) {
            $validated['summary']['en'] = $validated['summary']['vi'];
        }
        if (empty($validated['content']['en'])) {
            $validated['content']['en'] = $validated['content']['vi'];
        }
        if (empty($validated['category']['en'])) {
            $validated['category']['en'] = $validated['category']['vi'];
        }

        if ($request->hasFile('image_file')) {
            if ($article->image && str_starts_with($article->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $article->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image_file')->store('news', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            $validated['image'] = $article->image;
        }

        unset($validated['image_file']);

        $article->update($validated);

        return redirect()->route('admin.news.index')
            ->with('success', 'Bài viết đã được cập nhật thành công!');
    }

    public function destroy(Article $article)
    {
        if ($article->image && str_starts_with($article->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $article->image);
            Storage::disk('public')->delete($oldPath);
        }

        $article->delete();

        return redirect()->route('admin.news.index')
            ->with('success', 'Bài viết đã được xóa thành công!');
    }
}

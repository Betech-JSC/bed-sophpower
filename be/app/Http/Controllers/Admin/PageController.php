<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $query = Page::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('slug', 'like', '%' . $search . '%')
                  ->orWhere('title->vi', 'like', '%' . $search . '%')
                  ->orWhere('title->en', 'like', '%' . $search . '%');
        }

        $pages = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Pages/Index', [
            'pages' => $pages,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Pages/Form', [
            'page' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:pages,slug'],
            'title' => ['required', 'array'],
            'title.vi' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'content' => ['required', 'array'],
            'content.vi' => ['required', 'string'],
            'content.en' => ['nullable', 'string'],
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
        ]);

        if (empty($validated['title']['en'])) {
            $validated['title']['en'] = $validated['title']['vi'];
        }
        if (empty($validated['content']['en'])) {
            $validated['content']['en'] = $validated['content']['vi'];
        }

        if ($request->hasFile('og_image_file')) {
            $path = $request->file('og_image_file')->store('seo', 'public');
            $validated['og_image'] = '/storage/' . $path;
        }

        unset($validated['og_image_file']);

        $page = Page::create($validated);

        ActivityLogger::log('create_page', "Đã tạo trang tĩnh mới: {$page->slug}");

        return redirect()->route('admin.pages.index')
            ->with('success', 'Trang tĩnh đã được tạo thành công!');
    }

    public function edit(Page $page)
    {
        return Inertia::render('Pages/Form', [
            'page' => $page,
        ]);
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:pages,slug,' . $page->id],
            'title' => ['required', 'array'],
            'title.vi' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'content' => ['required', 'array'],
            'content.vi' => ['required', 'string'],
            'content.en' => ['nullable', 'string'],
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
        ]);

        if (empty($validated['title']['en'])) {
            $validated['title']['en'] = $validated['title']['vi'];
        }
        if (empty($validated['content']['en'])) {
            $validated['content']['en'] = $validated['content']['vi'];
        }

        if ($request->hasFile('og_image_file')) {
            if ($page->og_image && str_starts_with($page->og_image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $page->og_image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('og_image_file')->store('seo', 'public');
            $validated['og_image'] = '/storage/' . $path;
        } else {
            if (is_null($request->input('og_image'))) {
                if ($page->og_image && str_starts_with($page->og_image, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $page->og_image);
                    Storage::disk('public')->delete($oldPath);
                }
                $validated['og_image'] = null;
            } else {
                $validated['og_image'] = $request->input('og_image');
            }
        }

        unset($validated['og_image_file']);

        $page->update($validated);

        ActivityLogger::log('update_page', "Đã cập nhật trang tĩnh: {$page->slug}");

        return redirect()->route('admin.pages.index')
            ->with('success', 'Trang tĩnh đã được cập nhật thành công!');
    }

    public function destroy(Page $page)
    {
        $slug = $page->slug;

        if ($page->og_image && str_starts_with($page->og_image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $page->og_image);
            Storage::disk('public')->delete($oldPath);
        }

        $page->delete();

        ActivityLogger::log('delete_page', "Đã xóa trang tĩnh: {$slug}");

        return redirect()->route('admin.pages.index')
            ->with('success', 'Trang tĩnh đã được xóa thành công!');
    }
}

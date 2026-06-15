<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoRedirect;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoRedirectController extends Controller
{
    public function index(Request $request)
    {
        $query = SeoRedirect::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('source_url', 'like', '%' . $search . '%')
                  ->orWhere('target_url', 'like', '%' . $search . '%');
        }

        $redirects = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('SeoRedirects/Index', [
            'redirects' => $redirects,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('SeoRedirects/Form', [
            'redirect' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'source_url' => ['required', 'string', 'max:255', 'unique:seo_redirects,source_url'],
            'target_url' => ['required', 'string', 'max:255'],
            'http_code' => ['required', 'in:301,302'],
        ]);

        $redirect = SeoRedirect::create($validated);

        ActivityLogger::log('create_redirect', "Đã tạo quy tắc chuyển hướng SEO: {$redirect->source_url} -> {$redirect->target_url}");

        return redirect()->route('admin.seo-redirects.index')
            ->with('success', 'Quy tắc chuyển hướng SEO đã được tạo thành công!');
    }

    public function edit(SeoRedirect $seoRedirect)
    {
        return Inertia::render('SeoRedirects/Form', [
            'redirect' => $seoRedirect,
        ]);
    }

    public function update(Request $request, SeoRedirect $seoRedirect)
    {
        $validated = $request->validate([
            'source_url' => ['required', 'string', 'max:255', 'unique:seo_redirects,source_url,' . $seoRedirect->id],
            'target_url' => ['required', 'string', 'max:255'],
            'http_code' => ['required', 'in:301,302'],
        ]);

        $seoRedirect->update($validated);

        ActivityLogger::log('update_redirect', "Đã cập nhật quy tắc chuyển hướng SEO: {$seoRedirect->source_url} -> {$seoRedirect->target_url}");

        return redirect()->route('admin.seo-redirects.index')
            ->with('success', 'Quy tắc chuyển hướng SEO đã được cập nhật thành công!');
    }

    public function destroy(SeoRedirect $seoRedirect)
    {
        $source = $seoRedirect->source_url;
        $seoRedirect->delete();

        ActivityLogger::log('delete_redirect', "Đã xóa quy tắc chuyển hướng SEO cho URL: {$source}");

        return redirect()->route('admin.seo-redirects.index')
            ->with('success', 'Quy tắc chuyển hướng SEO đã được xóa thành công!');
    }
}

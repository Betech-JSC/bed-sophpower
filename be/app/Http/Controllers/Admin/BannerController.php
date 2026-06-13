<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index(Request $request)
    {
        $query = Banner::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('title->vi', 'like', '%' . $search . '%')
                  ->orWhere('title->en', 'like', '%' . $search . '%');
        }

        $banners = $query->orderBy('order')->paginate(10)->withQueryString();

        return Inertia::render('Banners/Index', [
            'banners' => $banners,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Banners/Form', [
            'banner' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'array'],
            'title.vi' => ['required', 'string', 'max:255'],
            'title.en' => ['required', 'string', 'max:255'],
            'image_file' => ['required', 'image', 'max:2048'],
            'link' => ['nullable', 'string', 'max:255'],
            'order' => ['required', 'integer'],
            'is_active' => ['required', 'boolean'],
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('banners', 'public');
            $validated['image'] = '/storage/' . $path;
        }
        unset($validated['image_file']);

        $banner = Banner::create($validated);

        ActivityLogger::log('create_banner', "Đã tạo banner slider mới ID: {$banner->id}");

        return redirect()->route('admin.banners.index')
            ->with('success', 'Banner đã được tạo thành công!');
    }

    public function edit(Banner $banner)
    {
        return Inertia::render('Banners/Form', [
            'banner' => $banner,
        ]);
    }

    public function update(Request $request, Banner $banner)
    {
        $validated = $request->validate([
            'title' => ['required', 'array'],
            'title.vi' => ['required', 'string', 'max:255'],
            'title.en' => ['required', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'link' => ['nullable', 'string', 'max:255'],
            'order' => ['required', 'integer'],
            'is_active' => ['required', 'boolean'],
        ]);

        if ($request->hasFile('image_file')) {
            // Delete old image if it's in storage
            if ($banner->image && str_starts_with($banner->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $banner->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image_file')->store('banners', 'public');
            $validated['image'] = '/storage/' . $path;
        }
        unset($validated['image_file']);

        $banner->update($validated);

        ActivityLogger::log('update_banner', "Đã cập nhật banner slider ID: {$banner->id}");

        return redirect()->route('admin.banners.index')
            ->with('success', 'Banner đã được cập nhật thành công!');
    }

    public function destroy(Banner $banner)
    {
        $id = $banner->id;
        if ($banner->image && str_starts_with($banner->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $banner->image);
            Storage::disk('public')->delete($oldPath);
        }

        $banner->delete();

        ActivityLogger::log('delete_banner', "Đã xóa banner slider ID: {$id}");

        return redirect()->route('admin.banners.index')
            ->with('success', 'Banner đã được xóa thành công!');
    }
}

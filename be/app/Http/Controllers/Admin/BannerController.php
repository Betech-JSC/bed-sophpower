<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BannerController extends Controller
{
    private const PAGE_KEYS = [
        'about',
        'food',
        'cosmetic',
        'news',
        'recruitment',
        'contact',
        'policies',
        'search',
    ];

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
            'title.en' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'image' => ['nullable', 'string'],
            'link' => ['nullable', 'string', 'max:255'],
            'is_home_slider' => ['required', 'boolean'],
            'page_key' => ['nullable', Rule::requiredIf(fn () => !$request->boolean('is_home_slider')), Rule::in(self::PAGE_KEYS)],
            'order' => ['required', 'integer'],
            'is_active' => ['required', 'boolean'],
        ]);

        if (empty($validated['title']['en'])) {
            $validated['title']['en'] = $validated['title']['vi'];
        }

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('banners', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if (empty($validated['image'])) {
            return redirect()->back()->withErrors(['image_file' => 'Ảnh banner slider là bắt buộc.']);
        }

        unset($validated['image_file']);
        $validated['is_home_slider'] = $request->boolean('is_home_slider');
        $validated['is_active'] = $request->boolean('is_active');
        $validated['page_key'] = $validated['is_home_slider'] ? null : ($validated['page_key'] ?? null);

        $banner = Banner::create($validated);
        $this->deactivateOtherPageBanners($banner);

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
            'title.en' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'image' => ['nullable', 'string'],
            'link' => ['nullable', 'string', 'max:255'],
            'is_home_slider' => ['required', 'boolean'],
            'page_key' => ['nullable', Rule::requiredIf(fn () => !$request->boolean('is_home_slider')), Rule::in(self::PAGE_KEYS)],
            'order' => ['required', 'integer'],
            'is_active' => ['required', 'boolean'],
        ]);

        if (empty($validated['title']['en'])) {
            $validated['title']['en'] = $validated['title']['vi'];
        }

        if ($request->hasFile('image_file')) {
            // Delete old image if it's in storage
            if ($banner->image && str_starts_with($banner->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $banner->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image_file')->store('banners', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            if (is_null($request->input('image'))) {
                if ($banner->image && str_starts_with($banner->image, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $banner->image);
                    Storage::disk('public')->delete($oldPath);
                }
                $validated['image'] = null;
            } else {
                $validated['image'] = $request->input('image');
            }
        }

        if (empty($validated['image'])) {
            return redirect()->back()->withErrors(['image_file' => 'Ảnh banner slider là bắt buộc.']);
        }

        unset($validated['image_file']);
        $validated['is_home_slider'] = $request->boolean('is_home_slider');
        $validated['is_active'] = $request->boolean('is_active');
        $validated['page_key'] = $validated['is_home_slider'] ? null : ($validated['page_key'] ?? null);

        $banner->update($validated);
        $this->deactivateOtherPageBanners($banner);

        ActivityLogger::log('update_banner', "Đã cập nhật banner slider ID: {$banner->id}");

        return redirect()->route('admin.banners.index')
            ->with('success', 'Banner đã được cập nhật thành công!');
    }

    private function deactivateOtherPageBanners(Banner $banner): void
    {
        if ($banner->is_home_slider || !$banner->is_active || !$banner->page_key) {
            return;
        }

        Banner::where('id', '!=', $banner->id)
            ->where('is_home_slider', false)
            ->where('page_key', $banner->page_key)
            ->where('is_active', true)
            ->update(['is_active' => false]);
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

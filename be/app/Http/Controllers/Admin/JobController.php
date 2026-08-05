<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RecruitmentJob;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = RecruitmentJob::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title->vi', 'like', '%' . $search . '%')
                  ->orWhere('title->en', 'like', '%' . $search . '%')
                  ->orWhere('department->vi', 'like', '%' . $search . '%')
                  ->orWhere('department->en', 'like', '%' . $search . '%');
            });
        }

        $jobs = $query->latest('id')->paginate(10)->withQueryString();

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Jobs/Form', [
            'job' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'array'],
            'title.vi' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'department' => ['required', 'array'],
            'department.vi' => ['required', 'string', 'max:255'],
            'department.en' => ['nullable', 'string', 'max:255'],
            'location' => ['required', 'array'],
            'location.vi' => ['required', 'string', 'max:255'],
            'location.en' => ['nullable', 'string', 'max:255'],
            'salary' => ['required', 'array'],
            'salary.vi' => ['required', 'string', 'max:255'],
            'salary.en' => ['nullable', 'string', 'max:255'],
            'deadline' => ['required', 'date'],
            'summary' => ['required', 'array'],
            'summary.vi' => ['required', 'string'],
            'summary.en' => ['nullable', 'string'],
            'requirements' => ['nullable', 'array'],
            'requirements.vi' => ['nullable', 'array'],
            'requirements.en' => ['nullable', 'array'],
            'responsibilities' => ['nullable', 'array'],
            'responsibilities.vi' => ['nullable', 'array'],
            'responsibilities.en' => ['nullable', 'array'],
            'benefits' => ['nullable', 'array'],
            'benefits.vi' => ['nullable', 'array'],
            'benefits.en' => ['nullable', 'array'],
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
        if (empty($validated['department']['en'])) {
            $validated['department']['en'] = $validated['department']['vi'];
        }
        if (empty($validated['location']['en'])) {
            $validated['location']['en'] = $validated['location']['vi'];
        }
        if (empty($validated['salary']['en'])) {
            $validated['salary']['en'] = $validated['salary']['vi'];
        }
        if (empty($validated['summary']['en'])) {
            $validated['summary']['en'] = $validated['summary']['vi'];
        }

        // Generate unique slug
        $baseSlug = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($validated['title']['vi']);
        if (empty($baseSlug)) {
            $baseSlug = 'job';
        }
        $slug = $baseSlug;
        $count = 1;
        while (RecruitmentJob::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('og_image_file')) {
            $path = $request->file('og_image_file')->store('seo', 'public');
            $validated['og_image'] = '/storage/' . $path;
        }

        unset($validated['og_image_file']);
 
        RecruitmentJob::create($validated);

        return redirect()->route('admin.jobs.index')
            ->with('success', 'Tin tuyển dụng đã được tạo thành công!');
    }

    public function edit(RecruitmentJob $job)
    {
        return Inertia::render('Jobs/Form', [
            'job' => $job,
        ]);
    }

    public function update(Request $request, RecruitmentJob $job)
    {
        $validated = $request->validate([
            'title' => ['required', 'array'],
            'title.vi' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'department' => ['required', 'array'],
            'department.vi' => ['required', 'string', 'max:255'],
            'department.en' => ['nullable', 'string', 'max:255'],
            'location' => ['required', 'array'],
            'location.vi' => ['required', 'string', 'max:255'],
            'location.en' => ['nullable', 'string', 'max:255'],
            'salary' => ['required', 'array'],
            'salary.vi' => ['required', 'string', 'max:255'],
            'salary.en' => ['nullable', 'string', 'max:255'],
            'deadline' => ['required', 'date'],
            'summary' => ['required', 'array'],
            'summary.vi' => ['required', 'string'],
            'summary.en' => ['nullable', 'string'],
            'requirements' => ['nullable', 'array'],
            'requirements.vi' => ['nullable', 'array'],
            'requirements.en' => ['nullable', 'array'],
            'responsibilities' => ['nullable', 'array'],
            'responsibilities.vi' => ['nullable', 'array'],
            'responsibilities.en' => ['nullable', 'array'],
            'benefits' => ['nullable', 'array'],
            'benefits.vi' => ['nullable', 'array'],
            'benefits.en' => ['nullable', 'array'],
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
        if (empty($validated['department']['en'])) {
            $validated['department']['en'] = $validated['department']['vi'];
        }
        if (empty($validated['location']['en'])) {
            $validated['location']['en'] = $validated['location']['vi'];
        }
        if (empty($validated['salary']['en'])) {
            $validated['salary']['en'] = $validated['salary']['vi'];
        }
        if (empty($validated['summary']['en'])) {
            $validated['summary']['en'] = $validated['summary']['vi'];
        }

        // Generate unique slug
        $baseSlug = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($validated['title']['vi']);
        if (empty($baseSlug)) {
            $baseSlug = 'job';
        }
        $slug = $baseSlug;
        $count = 1;
        while (RecruitmentJob::where('slug', $slug)->where('id', '!=', $job->id)->exists()) {
            $slug = $baseSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('og_image_file')) {
            if ($job->og_image && str_starts_with($job->og_image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $job->og_image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('og_image_file')->store('seo', 'public');
            $validated['og_image'] = '/storage/' . $path;
        } else {
            if (is_null($request->input('og_image'))) {
                if ($job->og_image && str_starts_with($job->og_image, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $job->og_image);
                    Storage::disk('public')->delete($oldPath);
                }
                $validated['og_image'] = null;
            } else {
                $validated['og_image'] = $request->input('og_image');
            }
        }

        unset($validated['og_image_file']);
 
        $job->update($validated);

        return redirect()->route('admin.jobs.index')
            ->with('success', 'Tin tuyển dụng đã được cập nhật thành công!');
    }

    public function destroy(RecruitmentJob $job)
    {
        if ($job->og_image && str_starts_with($job->og_image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $job->og_image);
            Storage::disk('public')->delete($oldPath);
        }

        $job->delete();

        return redirect()->route('admin.jobs.index')
            ->with('success', 'Tin tuyển dụng đã được xóa thành công!');
    }
}

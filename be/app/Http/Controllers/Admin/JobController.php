<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RecruitmentJob;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        $jobs = $query->latest()->paginate(10)->withQueryString();

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

        $job->update($validated);

        return redirect()->route('admin.jobs.index')
            ->with('success', 'Tin tuyển dụng đã được cập nhật thành công!');
    }

    public function destroy(RecruitmentJob $job)
    {
        $job->delete();

        return redirect()->route('admin.jobs.index')
            ->with('success', 'Tin tuyển dụng đã được xóa thành công!');
    }
}

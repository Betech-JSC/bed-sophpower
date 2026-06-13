<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $query = Faq::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('question->vi', 'like', '%' . $search . '%')
                  ->orWhere('question->en', 'like', '%' . $search . '%')
                  ->orWhere('category->vi', 'like', '%' . $search . '%')
                  ->orWhere('category->en', 'like', '%' . $search . '%');
        }

        $faqs = $query->orderBy('order')->paginate(10)->withQueryString();

        return Inertia::render('Faqs/Index', [
            'faqs' => $faqs,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Faqs/Form', [
            'faq' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => ['required', 'array'],
            'question.vi' => ['required', 'string'],
            'question.en' => ['nullable', 'string'],
            'answer' => ['required', 'array'],
            'answer.vi' => ['required', 'string'],
            'answer.en' => ['nullable', 'string'],
            'category' => ['required', 'array'],
            'category.vi' => ['required', 'string', 'max:255'],
            'category.en' => ['nullable', 'string', 'max:255'],
            'order' => ['required', 'integer'],
        ]);

        if (empty($validated['question']['en'])) {
            $validated['question']['en'] = $validated['question']['vi'];
        }
        if (empty($validated['answer']['en'])) {
            $validated['answer']['en'] = $validated['answer']['vi'];
        }
        if (empty($validated['category']['en'])) {
            $validated['category']['en'] = $validated['category']['vi'];
        }

        $faq = Faq::create($validated);

        ActivityLogger::log('create_faq', "Đã tạo câu hỏi FAQ mới ID: {$faq->id}");

        return redirect()->route('admin.faqs.index')
            ->with('success', 'Câu hỏi FAQ đã được tạo thành công!');
    }

    public function edit(Faq $faq)
    {
        return Inertia::render('Faqs/Form', [
            'faq' => $faq,
        ]);
    }

    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question' => ['required', 'array'],
            'question.vi' => ['required', 'string'],
            'question.en' => ['nullable', 'string'],
            'answer' => ['required', 'array'],
            'answer.vi' => ['required', 'string'],
            'answer.en' => ['nullable', 'string'],
            'category' => ['required', 'array'],
            'category.vi' => ['required', 'string', 'max:255'],
            'category.en' => ['nullable', 'string', 'max:255'],
            'order' => ['required', 'integer'],
        ]);

        if (empty($validated['question']['en'])) {
            $validated['question']['en'] = $validated['question']['vi'];
        }
        if (empty($validated['answer']['en'])) {
            $validated['answer']['en'] = $validated['answer']['vi'];
        }
        if (empty($validated['category']['en'])) {
            $validated['category']['en'] = $validated['category']['vi'];
        }

        $faq->update($validated);

        ActivityLogger::log('update_faq', "Đã cập nhật câu hỏi FAQ ID: {$faq->id}");

        return redirect()->route('admin.faqs.index')
            ->with('success', 'Câu hỏi FAQ đã được cập nhật thành công!');
    }

    public function destroy(Faq $faq)
    {
        $id = $faq->id;
        $faq->delete();

        ActivityLogger::log('delete_faq', "Đã xóa câu hỏi FAQ ID: {$id}");

        return redirect()->route('admin.faqs.index')
            ->with('success', 'Câu hỏi FAQ đã được xóa thành công!');
    }
}

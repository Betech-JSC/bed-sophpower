<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductQuestion;
use App\Models\Product;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductQuestionController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductQuestion::with('product');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('customer_name', 'like', '%' . $search . '%')
                  ->orWhere('customer_email', 'like', '%' . $search . '%')
                  ->orWhere('question', 'like', '%' . $search . '%');
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $questions = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('ProductQuestions/Index', [
            'questions' => $questions,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function update(Request $request, ProductQuestion $productQuestion)
    {
        $validated = $request->validate([
            'answer' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,approved,replied'],
        ]);

        $productQuestion->update($validated);

        ActivityLogger::log('update_product_question', "Đã duyệt/phản hồi câu hỏi sản phẩm ID: {$productQuestion->id}");

        return redirect()->route('admin.product-questions.index')
            ->with('success', 'Câu hỏi thắc mắc sản phẩm đã được cập nhật thành công!');
    }

    public function destroy(ProductQuestion $productQuestion)
    {
        $id = $productQuestion->id;
        $productQuestion->delete();

        ActivityLogger::log('delete_product_question', "Đã xóa câu hỏi sản phẩm ID: {$id}");

        return redirect()->route('admin.product-questions.index')
            ->with('success', 'Câu hỏi thắc mắc sản phẩm đã được xóa thành công!');
    }
}

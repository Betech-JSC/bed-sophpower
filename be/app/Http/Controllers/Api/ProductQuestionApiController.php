<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductQuestion;
use Illuminate\Http\Request;

class ProductQuestionApiController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['nullable', 'string', 'max:20'],
            'question' => ['required', 'string'],
        ]);

        $question = ProductQuestion::create($validated);

        return response()->json([
            'message' => 'Yêu cầu thắc mắc của bạn đã được gửi thành công!',
            'question' => $question,
        ], 201);
    }
}

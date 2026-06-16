<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiChatController extends Controller
{
    /**
     * Handle the AI chat request.
     */
    public function chat(Request $request)
    {
        $request->validate([
            'messages' => 'required|array',
            'messages.*.role' => 'required|string|in:user,assistant,model',
            'messages.*.content' => 'required|string',
        ]);

        $apiKey = env('GEMINI_API_KEY');

        // Fallback response if API Key is not set
        if (empty($apiKey)) {
            return response()->json([
                'role' => 'model',
                'content' => "Chào bạn! Trợ lý AI của Sophpower đã sẵn sàng. \n\nHiện tại hệ thống **chưa được cấu hình API Key**. Vui lòng thêm khóa `GEMINI_API_KEY` của Google Gemini vào file `.env` ở thư mục backend Laravel để kích hoạt tính năng trò chuyện với AI nhé!",
            ]);
        }

        $systemInstruction = "Bạn là Sophpower AI Assistant, một trợ lý ảo thông minh được tích hợp trực tiếp trong Hệ quản trị nội dung (CMS) của Sophpower Vietnam (nhà cung cấp hàng đầu về nguyên liệu thực phẩm và nguyên liệu mỹ phẩm).\n\n" .
            "Nhiệm vụ chính của bạn:\n" .
            "1. Hỗ trợ dịch thuật: Dịch thuật nội dung (tiêu đề, mô tả, nội dung chi tiết) chính xác giữa tiếng Việt và tiếng Anh, giữ đúng văn phong chuyên ngành thực phẩm, mỹ phẩm và hóa chất.\n" .
            "2. Viết và tối ưu nội dung: Hỗ trợ soạn thảo mô tả sản phẩm, tóm tắt tin tức, viết mô tả công việc tuyển dụng chuyên nghiệp.\n" .
            "3. Tối ưu hóa SEO: Đề xuất tiêu đề SEO (seo_title dưới 60 ký tự) và thẻ mô tả SEO (seo_desc dưới 160 ký tự) dựa trên bài viết hoặc sản phẩm được cung cấp.\n" .
            "4. Định dạng phản hồi: Sử dụng Markdown (đậm, nghiêng, danh sách gạch đầu dòng, tiêu đề phụ) để nội dung hiển thị rõ ràng, dễ đọc trên giao diện chat.\n" .
            "Hãy trả lời một cách lịch sự, ngắn gọn, tập trung vào công việc và luôn xưng là 'Tôi' hoặc 'Trợ lý AI'.";

        // Format history for Gemini API (uses 'user' and 'model' roles)
        $contents = [];
        foreach ($request->messages as $msg) {
            $role = ($msg['role'] === 'assistant') ? 'model' : $msg['role'];
            $contents[] = [
                'role' => $role,
                'parts' => [
                    ['text' => $msg['content']]
                ]
            ];
        }

        try {
            $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
            
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($endpoint . "?key=" . $apiKey, [
                'contents' => $contents,
                'systemInstruction' => [
                    'parts' => [
                        ['text' => $systemInstruction]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 2048,
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $replyText = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
                
                if (empty($replyText)) {
                    throw new \Exception('Gemini returned an empty response.');
                }

                return response()->json([
                    'role' => 'model',
                    'content' => $replyText,
                ]);
            }

            Log::error('Gemini API Error Response: ' . $response->body());
            return response()->json([
                'role' => 'model',
                'content' => 'Xin lỗi, đã xảy ra lỗi khi kết nối với máy chủ AI (Mã lỗi: ' . $response->status() . '). Vui lòng thử lại sau ít phút.',
            ], 500);

        } catch (\Exception $e) {
            Log::error('Gemini API Exception: ' . $e->getMessage());
            return response()->json([
                'role' => 'model',
                'content' => 'Đã xảy ra lỗi hệ thống khi xử lý yêu cầu của bạn. Vui lòng kiểm tra lại cấu hình kết nối mạng hoặc liên hệ kỹ thuật.',
            ], 500);
        }
    }
}

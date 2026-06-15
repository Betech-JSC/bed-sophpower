<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeadApiController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|email|max:100',
            'phone' => 'nullable|string|regex:/^[0-9+ ]{9,15}$/',
            'message' => 'required|string|min:10|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $lead = Lead::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
            'status' => 'pending',
        ]);

        try {
            $admins = \App\Models\User::all();
            if ($admins->count() > 0) {
                \Illuminate\Support\Facades\Notification::send($admins, new \App\Notifications\NewLeadReceived($lead));
            } else {
                \Illuminate\Support\Facades\Notification::route('mail', config('mail.from.address') ?: 'admin@sophpower.com')
                    ->notify(new \App\Notifications\NewLeadReceived($lead));
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Gửi email thông báo liên hệ thất bại: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Yêu cầu của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.',
            'lead' => $lead
        ], 201);
    }
}

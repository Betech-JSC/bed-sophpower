<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;

class FaqApiController extends Controller
{
    public function index()
    {
        $faqs = Faq::orderBy('order')->get();
        return response()->json($faqs);
    }
}

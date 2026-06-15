<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;

class BannerApiController extends Controller
{
    public function index()
    {
        $banners = Banner::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json($banners);
    }
}

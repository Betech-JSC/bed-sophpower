<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Banner::where('is_active', true);

        if ($request->filled('page_key')) {
            $query->where('is_home_slider', false)
                ->where('page_key', $request->query('page_key'));
        } else {
            $query->where('is_home_slider', true);
        }

        $banners = $query
            ->orderBy('order')
            ->get();

        return response()->json($banners);
    }
}

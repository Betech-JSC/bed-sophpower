<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SeoRedirect;
use Illuminate\Support\Facades\Cache;

class RedirectApiController extends Controller
{
    /**
     * Get list of all SEO redirects.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $redirects = Cache::rememberForever('seo_redirects_list', function () {
            return SeoRedirect::select(['source_url', 'target_url', 'http_code'])->get()->toArray();
        });

        return response()->json($redirects);
    }
}

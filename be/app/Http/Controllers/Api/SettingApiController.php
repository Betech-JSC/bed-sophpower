<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;

class SettingApiController extends Controller
{
    public function index()
    {
        $keys = [
            'meta_title_vi', 'meta_title_en', 'meta_desc_vi', 'meta_desc_en', 'meta_keywords_vi', 'meta_keywords_en',
            'contact_phone', 'contact_email', 'contact_address_vi', 'contact_address_en',
            'header_scripts', 'footer_scripts',
            'site_logo', 'site_favicon'
        ];

        $settings = [];
        foreach ($keys as $key) {
            $settings[$key] = Setting::getVal($key, '');
        }

        return response()->json($settings);
    }
}

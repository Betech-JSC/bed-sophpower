<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $keys = [
            'smtp_host', 'smtp_port', 'smtp_username', 'smtp_password', 'smtp_encryption', 'smtp_from_address', 'smtp_from_name',
            'meta_title_vi', 'meta_title_en', 'meta_desc_vi', 'meta_desc_en', 'meta_keywords_vi', 'meta_keywords_en',
            'contact_phone', 'contact_email', 'contact_address_vi', 'contact_address_en',
            'header_scripts', 'footer_scripts', 'seo_robots_txt',
            'site_logo', 'site_favicon'
        ];

        $settings = [];
        foreach ($keys as $key) {
            $settings[$key] = Setting::getVal($key, '');
        }

        return Inertia::render('Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'smtp_host' => ['nullable', 'string'],
            'smtp_port' => ['nullable', 'string'],
            'smtp_username' => ['nullable', 'string'],
            'smtp_password' => ['nullable', 'string'],
            'smtp_encryption' => ['nullable', 'string'],
            'smtp_from_address' => ['nullable', 'string'],
            'smtp_from_name' => ['nullable', 'string'],
            'meta_title_vi' => ['nullable', 'string'],
            'meta_title_en' => ['nullable', 'string'],
            'meta_desc_vi' => ['nullable', 'string'],
            'meta_desc_en' => ['nullable', 'string'],
            'meta_keywords_vi' => ['nullable', 'string'],
            'meta_keywords_en' => ['nullable', 'string'],
            'contact_phone' => ['nullable', 'string'],
            'contact_email' => ['nullable', 'string'],
            'contact_address_vi' => ['nullable', 'string'],
            'contact_address_en' => ['nullable', 'string'],
            'header_scripts' => ['nullable', 'string'],
            'footer_scripts' => ['nullable', 'string'],
            'seo_robots_txt' => ['nullable', 'string'],
            'logo_file' => ['nullable', 'image', 'max:2048'],
            'favicon_file' => ['nullable', 'image', 'max:1024'],
        ]);

        if ($request->hasFile('logo_file')) {
            $path = $request->file('logo_file')->store('settings', 'public');
            Setting::setVal('site_logo', '/storage/' . $path);
        }

        if ($request->hasFile('favicon_file')) {
            $path = $request->file('favicon_file')->store('settings', 'public');
            Setting::setVal('site_favicon', '/storage/' . $path);
        }

        foreach ($validated as $key => $val) {
            if (in_array($key, ['logo_file', 'favicon_file'])) {
                continue;
            }
            Setting::setVal($key, $val ?? '');
        }

        ActivityLogger::log('update_settings', "Cập nhật cấu hình hệ thống (SEO/SMTP/Scripts/Contact/Robots/Logo/Favicon)");

        return redirect()->route('admin.settings.index')
            ->with('success', 'Cấu hình hệ thống đã được cập nhật thành công!');
    }
}

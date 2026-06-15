<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\JobController;
use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SeoRedirectController;
use App\Http\Controllers\Admin\ProductQuestionController;
use App\Http\Controllers\Admin\ActivityLogController;
use App\Http\Controllers\Admin\TranslationController;
use App\Http\Controllers\Admin\MediaController;

Route::get('/', function () {
    return redirect('/admin/login');
});

// Admin Authentication Routes (Guest)
Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/admin/login', [AuthController::class, 'login']);
});

// Admin Protected Routes (Auth)
Route::middleware('auth')->group(function () {
    Route::get('/admin', function () {
        return redirect('/admin/dashboard');
    });
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::post('/admin/logout', [AuthController::class, 'logout'])->name('admin.logout');

    // Products CRUD
    Route::get('/admin/products', [ProductController::class, 'index'])->name('admin.products.index');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('admin.products.create');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('admin.products.store');
    Route::get('/admin/products/{product}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::post('/admin/products/{product}', [ProductController::class, 'update'])->name('admin.products.update'); // using POST due to file upload constraints with PUT in Laravel
    Route::delete('/admin/products/{product}', [ProductController::class, 'destroy'])->name('admin.products.destroy');

    // News Articles CRUD
    Route::get('/admin/news', [ArticleController::class, 'index'])->name('admin.news.index');
    Route::get('/admin/news/create', [ArticleController::class, 'create'])->name('admin.news.create');
    Route::post('/admin/news', [ArticleController::class, 'store'])->name('admin.news.store');
    Route::get('/admin/news/{article}/edit', [ArticleController::class, 'edit'])->name('admin.news.edit');
    Route::post('/admin/news/{article}', [ArticleController::class, 'update'])->name('admin.news.update'); // using POST for file upload support
    Route::delete('/admin/news/{article}', [ArticleController::class, 'destroy'])->name('admin.news.destroy');

    // Recruitment Jobs CRUD
    Route::get('/admin/jobs', [JobController::class, 'index'])->name('admin.jobs.index');
    Route::get('/admin/jobs/create', [JobController::class, 'create'])->name('admin.jobs.create');
    Route::post('/admin/jobs', [JobController::class, 'store'])->name('admin.jobs.store');
    Route::get('/admin/jobs/{job}/edit', [JobController::class, 'edit'])->name('admin.jobs.edit');
    Route::put('/admin/jobs/{job}', [JobController::class, 'update'])->name('admin.jobs.update');
    Route::delete('/admin/jobs/{job}', [JobController::class, 'destroy'])->name('admin.jobs.destroy');

    // Contact Leads management
    Route::get('/admin/leads', [LeadController::class, 'index'])->name('admin.leads.index');
    Route::patch('/admin/leads/{lead}/status', [LeadController::class, 'updateStatus'])->name('admin.leads.updateStatus');
    Route::delete('/admin/leads/{lead}', [LeadController::class, 'destroy'])->name('admin.leads.destroy');

    // Static Pages CRUD
    Route::get('/admin/pages', [PageController::class, 'index'])->name('admin.pages.index');
    Route::get('/admin/pages/create', [PageController::class, 'create'])->name('admin.pages.create');
    Route::post('/admin/pages', [PageController::class, 'store'])->name('admin.pages.store');
    Route::get('/admin/pages/{page}/edit', [PageController::class, 'edit'])->name('admin.pages.edit');
    Route::put('/admin/pages/{page}', [PageController::class, 'update'])->name('admin.pages.update');
    Route::delete('/admin/pages/{page}', [PageController::class, 'destroy'])->name('admin.pages.destroy');

    // Banners Slider CRUD
    Route::get('/admin/banners', [BannerController::class, 'index'])->name('admin.banners.index');
    Route::get('/admin/banners/create', [BannerController::class, 'create'])->name('admin.banners.create');
    Route::post('/admin/banners', [BannerController::class, 'store'])->name('admin.banners.store');
    Route::get('/admin/banners/{banner}/edit', [BannerController::class, 'edit'])->name('admin.banners.edit');
    Route::post('/admin/banners/{banner}', [BannerController::class, 'update'])->name('admin.banners.update');
    Route::delete('/admin/banners/{banner}', [BannerController::class, 'destroy'])->name('admin.banners.destroy');

    // FAQs CRUD
    Route::get('/admin/faqs', [FaqController::class, 'index'])->name('admin.faqs.index');
    Route::get('/admin/faqs/create', [FaqController::class, 'create'])->name('admin.faqs.create');
    Route::post('/admin/faqs', [FaqController::class, 'store'])->name('admin.faqs.store');
    Route::get('/admin/faqs/{faq}/edit', [FaqController::class, 'edit'])->name('admin.faqs.edit');
    Route::put('/admin/faqs/{faq}', [FaqController::class, 'update'])->name('admin.faqs.update');
    Route::delete('/admin/faqs/{faq}', [FaqController::class, 'destroy'])->name('admin.faqs.destroy');

    // SEO Redirects CRUD
    Route::get('/admin/seo-redirects', [SeoRedirectController::class, 'index'])->name('admin.seo-redirects.index');
    Route::get('/admin/seo-redirects/create', [SeoRedirectController::class, 'create'])->name('admin.seo-redirects.create');
    Route::post('/admin/seo-redirects', [SeoRedirectController::class, 'store'])->name('admin.seo-redirects.store');
    Route::get('/admin/seo-redirects/{seoRedirect}/edit', [SeoRedirectController::class, 'edit'])->name('admin.seo-redirects.edit');
    Route::put('/admin/seo-redirects/{seoRedirect}', [SeoRedirectController::class, 'update'])->name('admin.seo-redirects.update');
    Route::delete('/admin/seo-redirects/{seoRedirect}', [SeoRedirectController::class, 'destroy'])->name('admin.seo-redirects.destroy');

    // Product Questions management
    Route::get('/admin/product-questions', [ProductQuestionController::class, 'index'])->name('admin.product-questions.index');
    Route::put('/admin/product-questions/{productQuestion}', [ProductQuestionController::class, 'update'])->name('admin.product-questions.update');
    Route::delete('/admin/product-questions/{productQuestion}', [ProductQuestionController::class, 'destroy'])->name('admin.product-questions.destroy');

    // Settings (Cấu hình)
    Route::get('/admin/settings', [SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('/admin/settings', [SettingController::class, 'update'])->name('admin.settings.update');

    // Activity Logs (Nhật ký)
    Route::get('/admin/activity-logs', [ActivityLogController::class, 'index'])->name('admin.activity-logs.index');

    // Translations CRUD (Quản lý nhãn dịch)
    Route::get('/admin/translations', [TranslationController::class, 'index'])->name('admin.translations.index');
    Route::get('/admin/translations/{translation}/edit', [TranslationController::class, 'edit'])->name('admin.translations.edit');
    Route::put('/admin/translations/{translation}', [TranslationController::class, 'update'])->name('admin.translations.update');

    // Media Files Management (Quản lý File)
    Route::get('/admin/media', [MediaController::class, 'index'])->name('admin.media.index');
    Route::post('/admin/media', [MediaController::class, 'store'])->name('admin.media.store');
    Route::delete('/admin/media/{media}', [MediaController::class, 'destroy'])->name('admin.media.destroy');
});


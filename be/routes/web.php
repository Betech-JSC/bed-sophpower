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
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\ArticleCategoryController;
use App\Http\Controllers\Admin\ForgotPasswordController;
use App\Http\Controllers\Admin\ResetPasswordController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\AiChatController;

Route::get('/', function () {
    return redirect('/admin/login');
});

// Admin Authentication Routes (Guest)
Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/admin/login', [AuthController::class, 'login']);

    Route::get('/admin/forgot-password', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
    Route::post('/admin/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::get('/admin/reset-password/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
    Route::post('/admin/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');
});

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;

// Admin Protected Routes (Auth)
Route::middleware('auth')->group(function () {
    Route::get('/admin', function () {
        return redirect('/admin/dashboard');
    });
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::post('/admin/logout', [AuthController::class, 'logout'])->name('admin.logout');

    // Profile Settings
    Route::get('/admin/profile', [ProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::put('/admin/profile', [ProfileController::class, 'update'])->name('admin.profile.update');

    // AI Chat Assistant
    Route::post('/admin/ai/chat', [AiChatController::class, 'chat'])->name('admin.ai.chat');

    // Admin Users CRUD
    Route::get('/admin/users', [UserController::class, 'index'])->middleware('permission:users.manage')->name('admin.users.index');
    Route::get('/admin/users/create', [UserController::class, 'create'])->middleware('permission:users.manage')->name('admin.users.create');
    Route::post('/admin/users', [UserController::class, 'store'])->middleware('permission:users.manage')->name('admin.users.store');
    Route::get('/admin/users/{user}/edit', [UserController::class, 'edit'])->middleware('permission:users.manage')->name('admin.users.edit');
    Route::post('/admin/users/{user}', [UserController::class, 'update'])->middleware('permission:users.manage')->name('admin.users.update');
    Route::delete('/admin/users/{user}', [UserController::class, 'destroy'])->middleware('permission:users.manage')->name('admin.users.destroy');

    // Roles & Permissions CRUD
    Route::get('/admin/roles', [RoleController::class, 'index'])->middleware('permission:roles.manage')->name('admin.roles.index');
    Route::get('/admin/roles/create', [RoleController::class, 'create'])->middleware('permission:roles.manage')->name('admin.roles.create');
    Route::post('/admin/roles', [RoleController::class, 'store'])->middleware('permission:roles.manage')->name('admin.roles.store');
    Route::get('/admin/roles/{role}/edit', [RoleController::class, 'edit'])->middleware('permission:roles.manage')->name('admin.roles.edit');
    Route::put('/admin/roles/{role}', [RoleController::class, 'update'])->middleware('permission:roles.manage')->name('admin.roles.update');
    Route::delete('/admin/roles/{role}', [RoleController::class, 'destroy'])->middleware('permission:roles.manage')->name('admin.roles.destroy');

    // Products CRUD
    Route::get('/admin/products', [ProductController::class, 'index'])->middleware('permission:products.view')->name('admin.products.index');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->middleware('permission:products.manage')->name('admin.products.create');
    Route::post('/admin/products', [ProductController::class, 'store'])->middleware('permission:products.manage')->name('admin.products.store');
    Route::get('/admin/products/{product}/edit', [ProductController::class, 'edit'])->middleware('permission:products.manage')->name('admin.products.edit');
    Route::post('/admin/products/{product}', [ProductController::class, 'update'])->middleware('permission:products.manage')->name('admin.products.update'); // using POST due to file upload constraints with PUT in Laravel
    Route::delete('/admin/products/{product}', [ProductController::class, 'destroy'])->middleware('permission:products.manage')->name('admin.products.destroy');

    // Product Categories CRUD
    Route::get('/admin/product-categories', [ProductCategoryController::class, 'index'])->middleware('permission:product-categories.view')->name('admin.product-categories.index');
    Route::get('/admin/product-categories/create', [ProductCategoryController::class, 'create'])->middleware('permission:product-categories.manage')->name('admin.product-categories.create');
    Route::post('/admin/product-categories', [ProductCategoryController::class, 'store'])->middleware('permission:product-categories.manage')->name('admin.product-categories.store');
    Route::get('/admin/product-categories/{productCategory}/edit', [ProductCategoryController::class, 'edit'])->middleware('permission:product-categories.manage')->name('admin.product-categories.edit');
    Route::put('/admin/product-categories/{productCategory}', [ProductCategoryController::class, 'update'])->middleware('permission:product-categories.manage')->name('admin.product-categories.update');
    Route::delete('/admin/product-categories/{productCategory}', [ProductCategoryController::class, 'destroy'])->middleware('permission:product-categories.manage')->name('admin.product-categories.destroy');

    // News Articles CRUD
    Route::get('/admin/news', [ArticleController::class, 'index'])->middleware('permission:news.view')->name('admin.news.index');
    Route::get('/admin/news/create', [ArticleController::class, 'create'])->middleware('permission:news.manage')->name('admin.news.create');
    Route::post('/admin/news', [ArticleController::class, 'store'])->middleware('permission:news.manage')->name('admin.news.store');
    Route::get('/admin/news/{article}/edit', [ArticleController::class, 'edit'])->middleware('permission:news.manage')->name('admin.news.edit');
    Route::post('/admin/news/{article}', [ArticleController::class, 'update'])->middleware('permission:news.manage')->name('admin.news.update'); // using POST for file upload support
    Route::delete('/admin/news/{article}', [ArticleController::class, 'destroy'])->middleware('permission:news.manage')->name('admin.news.destroy');

    // Article Categories CRUD
    Route::get('/admin/article-categories', [ArticleCategoryController::class, 'index'])->middleware('permission:article-categories.view')->name('admin.article-categories.index');
    Route::get('/admin/article-categories/create', [ArticleCategoryController::class, 'create'])->middleware('permission:article-categories.manage')->name('admin.article-categories.create');
    Route::post('/admin/article-categories', [ArticleCategoryController::class, 'store'])->middleware('permission:article-categories.manage')->name('admin.article-categories.store');
    Route::get('/admin/article-categories/{articleCategory}/edit', [ArticleCategoryController::class, 'edit'])->middleware('permission:article-categories.manage')->name('admin.article-categories.edit');
    Route::put('/admin/article-categories/{articleCategory}', [ArticleCategoryController::class, 'update'])->middleware('permission:article-categories.manage')->name('admin.article-categories.update');
    Route::delete('/admin/article-categories/{articleCategory}', [ArticleCategoryController::class, 'destroy'])->middleware('permission:article-categories.manage')->name('admin.article-categories.destroy');

    // Recruitment Jobs CRUD
    Route::get('/admin/jobs', [JobController::class, 'index'])->middleware('permission:jobs.view')->name('admin.jobs.index');
    Route::get('/admin/jobs/create', [JobController::class, 'create'])->middleware('permission:jobs.manage')->name('admin.jobs.create');
    Route::post('/admin/jobs', [JobController::class, 'store'])->middleware('permission:jobs.manage')->name('admin.jobs.store');
    Route::get('/admin/jobs/{job}/edit', [JobController::class, 'edit'])->middleware('permission:jobs.manage')->name('admin.jobs.edit');
    Route::put('/admin/jobs/{job}', [JobController::class, 'update'])->middleware('permission:jobs.manage')->name('admin.jobs.update');
    Route::delete('/admin/jobs/{job}', [JobController::class, 'destroy'])->middleware('permission:jobs.manage')->name('admin.jobs.destroy');

    // Contact Leads management
    Route::get('/admin/leads', [LeadController::class, 'index'])->middleware('permission:leads.view')->name('admin.leads.index');
    Route::patch('/admin/leads/{lead}/status', [LeadController::class, 'updateStatus'])->middleware('permission:leads.manage')->name('admin.leads.updateStatus');
    Route::delete('/admin/leads/{lead}', [LeadController::class, 'destroy'])->middleware('permission:leads.manage')->name('admin.leads.destroy');

    // Static Pages CRUD
    Route::get('/admin/pages', [PageController::class, 'index'])->middleware('permission:pages.view')->name('admin.pages.index');
    Route::get('/admin/pages/create', [PageController::class, 'create'])->middleware('permission:pages.manage')->name('admin.pages.create');
    Route::post('/admin/pages', [PageController::class, 'store'])->middleware('permission:pages.manage')->name('admin.pages.store');
    Route::get('/admin/pages/{page}/edit', [PageController::class, 'edit'])->middleware('permission:pages.manage')->name('admin.pages.edit');
    Route::put('/admin/pages/{page}', [PageController::class, 'update'])->middleware('permission:pages.manage')->name('admin.pages.update');
    Route::delete('/admin/pages/{page}', [PageController::class, 'destroy'])->middleware('permission:pages.manage')->name('admin.pages.destroy');

    // Banners Slider CRUD
    Route::get('/admin/banners', [BannerController::class, 'index'])->middleware('permission:banners.view')->name('admin.banners.index');
    Route::get('/admin/banners/create', [BannerController::class, 'create'])->middleware('permission:banners.manage')->name('admin.banners.create');
    Route::post('/admin/banners', [BannerController::class, 'store'])->middleware('permission:banners.manage')->name('admin.banners.store');
    Route::get('/admin/banners/{banner}/edit', [BannerController::class, 'edit'])->middleware('permission:banners.manage')->name('admin.banners.edit');
    Route::post('/admin/banners/{banner}', [BannerController::class, 'update'])->middleware('permission:banners.manage')->name('admin.banners.update');
    Route::delete('/admin/banners/{banner}', [BannerController::class, 'destroy'])->middleware('permission:banners.manage')->name('admin.banners.destroy');

    // FAQs CRUD
    Route::get('/admin/faqs', [FaqController::class, 'index'])->middleware('permission:faqs.view')->name('admin.faqs.index');
    Route::get('/admin/faqs/create', [FaqController::class, 'create'])->middleware('permission:faqs.manage')->name('admin.faqs.create');
    Route::post('/admin/faqs', [FaqController::class, 'store'])->middleware('permission:faqs.manage')->name('admin.faqs.store');
    Route::get('/admin/faqs/{faq}/edit', [FaqController::class, 'edit'])->middleware('permission:faqs.manage')->name('admin.faqs.edit');
    Route::put('/admin/faqs/{faq}', [FaqController::class, 'update'])->middleware('permission:faqs.manage')->name('admin.faqs.update');
    Route::delete('/admin/faqs/{faq}', [FaqController::class, 'destroy'])->middleware('permission:faqs.manage')->name('admin.faqs.destroy');

    // SEO Redirects CRUD
    Route::get('/admin/seo-redirects', [SeoRedirectController::class, 'index'])->middleware('permission:seo-redirects.view')->name('admin.seo-redirects.index');
    Route::get('/admin/seo-redirects/create', [SeoRedirectController::class, 'create'])->middleware('permission:seo-redirects.manage')->name('admin.seo-redirects.create');
    Route::post('/admin/seo-redirects', [SeoRedirectController::class, 'store'])->middleware('permission:seo-redirects.manage')->name('admin.seo-redirects.store');
    Route::get('/admin/seo-redirects/{seoRedirect}/edit', [SeoRedirectController::class, 'edit'])->middleware('permission:seo-redirects.manage')->name('admin.seo-redirects.edit');
    Route::put('/admin/seo-redirects/{seoRedirect}', [SeoRedirectController::class, 'update'])->middleware('permission:seo-redirects.manage')->name('admin.seo-redirects.update');
    Route::delete('/admin/seo-redirects/{seoRedirect}', [SeoRedirectController::class, 'destroy'])->middleware('permission:seo-redirects.manage')->name('admin.seo-redirects.destroy');

    // Product Questions management
    Route::get('/admin/product-questions', [ProductQuestionController::class, 'index'])->middleware('permission:product-questions.view')->name('admin.product-questions.index');
    Route::put('/admin/product-questions/{productQuestion}', [ProductQuestionController::class, 'update'])->middleware('permission:product-questions.manage')->name('admin.product-questions.update');
    Route::delete('/admin/product-questions/{productQuestion}', [ProductQuestionController::class, 'destroy'])->middleware('permission:product-questions.manage')->name('admin.product-questions.destroy');

    // Settings (Cấu hình)
    Route::get('/admin/settings', [SettingController::class, 'index'])->middleware('permission:settings.manage')->name('admin.settings.index');
    Route::post('/admin/settings', [SettingController::class, 'update'])->middleware('permission:settings.manage')->name('admin.settings.update');

    // Activity Logs (Nhật ký)
    Route::get('/admin/activity-logs', [ActivityLogController::class, 'index'])->middleware('permission:activity_logs.view')->name('admin.activity-logs.index');

    // Translations CRUD (Quản lý nhãn dịch)
    Route::get('/admin/translations', [TranslationController::class, 'index'])->middleware('permission:translations.view')->name('admin.translations.index');
    Route::get('/admin/translations/{translation}/edit', [TranslationController::class, 'edit'])->middleware('permission:translations.manage')->name('admin.translations.edit');
    Route::put('/admin/translations/{translation}', [TranslationController::class, 'update'])->middleware('permission:translations.manage')->name('admin.translations.update');

    // Media Files Management (Quản lý File)
    Route::get('/admin/media', [MediaController::class, 'index'])->middleware('permission:media.view')->name('admin.media.index');
    Route::get('/admin/media/json', [MediaController::class, 'listJson'])->middleware('permission:media.view')->name('admin.media.json');
    Route::post('/admin/media', [MediaController::class, 'store'])->middleware('permission:media.manage')->name('admin.media.store');
    Route::delete('/admin/media/{media}', [MediaController::class, 'destroy'])->middleware('permission:media.manage')->name('admin.media.destroy');

    // CMS & Website User Guide (Hướng dẫn sử dụng)
    Route::get('/admin/guide', function () {
        return \Inertia\Inertia::render('Guide/Index');
    })->name('admin.guide');
});


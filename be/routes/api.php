<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\ArticleApiController;
use App\Http\Controllers\Api\JobApiController;
use App\Http\Controllers\Api\LeadApiController;
use App\Http\Controllers\Api\BannerApiController;
use App\Http\Controllers\Api\FaqApiController;
use App\Http\Controllers\Api\PageApiController;
use App\Http\Controllers\Api\SettingApiController;
use App\Http\Controllers\Api\ProductQuestionApiController;
use App\Http\Controllers\Api\TranslationApiController;
use App\Http\Controllers\Api\RedirectApiController;
use App\Http\Controllers\Api\ProductCategoryApiController;

Route::get('/product-categories', [ProductCategoryApiController::class, 'index']);
Route::get('/products', [ProductApiController::class, 'index']);
Route::get('/products/{id}', [ProductApiController::class, 'show']);

Route::get('/news', [ArticleApiController::class, 'index']);
Route::get('/news/categories', [ArticleApiController::class, 'categories']);
Route::get('/news/{id}', [ArticleApiController::class, 'show']);

Route::get('/recruitment', [JobApiController::class, 'index']);
Route::get('/recruitment/{id}', [JobApiController::class, 'show']);

Route::get('/leads', [LeadApiController::class, 'index']);
Route::post('/contact', [LeadApiController::class, 'store']);
Route::patch('/leads/{id}/status', [LeadApiController::class, 'updateStatus']);

Route::get('/banners', [BannerApiController::class, 'index']);
Route::get('/faqs', [FaqApiController::class, 'index']);
Route::get('/pages', [PageApiController::class, 'index']);
Route::get('/pages/{slug}', [PageApiController::class, 'show']);
Route::get('/settings', [SettingApiController::class, 'index']);
Route::post('/product-questions', [ProductQuestionApiController::class, 'store']);
Route::get('/translations', [TranslationApiController::class, 'index']);
Route::get('/redirects', [RedirectApiController::class, 'index']);

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

Route::get('/products', [ProductApiController::class, 'index']);
Route::get('/products/{id}', [ProductApiController::class, 'show']);

Route::get('/news', [ArticleApiController::class, 'index']);
Route::get('/news/{id}', [ArticleApiController::class, 'show']);

Route::get('/recruitment', [JobApiController::class, 'index']);
Route::get('/recruitment/{id}', [JobApiController::class, 'show']);

Route::post('/contact', [LeadApiController::class, 'store']);

Route::get('/banners', [BannerApiController::class, 'index']);
Route::get('/faqs', [FaqApiController::class, 'index']);
Route::get('/pages', [PageApiController::class, 'index']);
Route::get('/pages/{slug}', [PageApiController::class, 'show']);
Route::get('/settings', [SettingApiController::class, 'index']);
Route::post('/product-questions', [ProductQuestionApiController::class, 'store']);

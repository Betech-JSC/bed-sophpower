<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with('articleCategory');

        if (!$request->input('preview') || $request->input('secret') !== env('PREVIEW_SECRET', 'SophpowerPreview2026')) {
            $query->where('status', 'published');
        }

        if ($request->has('category') && $request->category !== 'Tất cả') {
            $query->where('category', $request->category);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('summary', 'like', '%' . $search . '%');
            });
        }

        return response()->json($query->orderBy('date', 'desc')->latest()->get());
    }

    public function show($idOrSlug)
    {
        $query = Article::with('articleCategory');

        if (!request()->input('preview') || request()->input('secret') !== env('PREVIEW_SECRET', 'SophpowerPreview2026')) {
            $query->where('status', 'published');
        }

        if (is_numeric($idOrSlug)) {
            $article = $query->where(function($q) use ($idOrSlug) {
                $q->where('id', $idOrSlug)->orWhere('slug', $idOrSlug);
            })->first();
        } else {
            $article = $query->where('slug', $idOrSlug)->first();
        }

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        return response()->json($article);
    }
}

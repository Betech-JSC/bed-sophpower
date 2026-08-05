<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::select([
            'id', 'title', 'summary', 'date', 'image', 'category', 'author', 'slug',
            'article_category_id', 'status', 'created_at', 'updated_at'
        ])->with('articleCategory');

        if (!$request->input('preview') || $request->input('secret') !== env('PREVIEW_SECRET', 'SophpowerPreview2026')) {
            $query->where('status', 'published');
        }

        if ($request->has('category') && $request->category !== 'Tất cả') {
            $category = $request->category;
            $query->where(function($q) use ($category) {
                if (is_numeric($category)) {
                    $q->where('article_category_id', $category);
                } else {
                    $q->whereHas('articleCategory', function($subQuery) use ($category) {
                        $subQuery->where('slug', $category)
                                 ->orWhere('name->vi', 'like', '%' . $category . '%')
                                 ->orWhere('name->en', 'like', '%' . $category . '%');
                    })->orWhere('category->vi', 'like', '%' . $category . '%')
                      ->orWhere('category->en', 'like', '%' . $category . '%');
                }
            });
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title->vi', 'like', '%' . $search . '%')
                  ->orWhere('title->en', 'like', '%' . $search . '%')
                  ->orWhere('summary->vi', 'like', '%' . $search . '%')
                  ->orWhere('summary->en', 'like', '%' . $search . '%')
                  ->orWhereHas('articleCategory', function($subQuery) use ($search) {
                      $subQuery->where('name->vi', 'like', '%' . $search . '%')
                               ->orWhere('name->en', 'like', '%' . $search . '%');
                  });
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

    public function categories()
    {
        $categories = \App\Models\ArticleCategory::orderBy('id', 'asc')->get();
        return response()->json($categories);
    }
}

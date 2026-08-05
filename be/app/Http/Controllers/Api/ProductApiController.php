<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('productCategory');

        if (!$request->input('preview') || $request->input('secret') !== env('PREVIEW_SECRET', 'SophpowerPreview2026')) {
            $query->where('status', 'published');
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('category')) {
            $category = $request->category;
            $query->where(function($q) use ($category) {
                if (is_numeric($category)) {
                    $q->where('product_category_id', $category);
                } else {
                    $q->whereHas('productCategory', function($subQuery) use ($category) {
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
                $q->where('name->vi', 'like', '%' . $search . '%')
                  ->orWhere('name->en', 'like', '%' . $search . '%')
                  ->orWhere('desc->vi', 'like', '%' . $search . '%')
                  ->orWhere('desc->en', 'like', '%' . $search . '%')
                  ->orWhereHas('productCategory', function($subQuery) use ($search) {
                      $subQuery->where('name->vi', 'like', '%' . $search . '%')
                               ->orWhere('name->en', 'like', '%' . $search . '%');
                  });
            });
        }

        return response()->json($query->orderBy('created_at', 'desc')->orderBy('id', 'desc')->get());
    }

    public function show($idOrSlug)
    {
        $query = Product::with(['productCategory', 'questions' => function($q) {
            $q->whereIn('status', ['approved', 'replied']);
        }]);

        if (!request()->input('preview') || request()->input('secret') !== env('PREVIEW_SECRET', 'SophpowerPreview2026')) {
            $query->where('status', 'published');
        }

        if (is_numeric($idOrSlug)) {
            $product = $query->where(function($q) use ($idOrSlug) {
                $q->where('id', $idOrSlug)->orWhere('slug', $idOrSlug);
            })->first();
        } else {
            $product = $query->where('slug', $idOrSlug)->first();
        }

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }
}

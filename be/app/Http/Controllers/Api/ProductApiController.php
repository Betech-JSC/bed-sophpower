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

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('desc', 'like', '%' . $search . '%');
            });
        }

        return response()->json($query->orderBy('created_at', 'desc')->orderBy('id', 'desc')->get());
    }

    public function show($idOrSlug)
    {
        $query = Product::with(['productCategory', 'questions' => function($q) {
            $q->whereIn('status', ['approved', 'replied']);
        }]);

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

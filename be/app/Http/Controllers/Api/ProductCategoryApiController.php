<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryApiController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductCategory::whereNull('parent_id')->with('children.children');

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $categories = $query->orderBy('sort_order', 'asc')->orderBy('id', 'asc')->get();

        return response()->json($categories);
    }
}

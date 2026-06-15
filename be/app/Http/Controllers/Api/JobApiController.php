<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RecruitmentJob;
use Illuminate\Http\Request;

class JobApiController extends Controller
{
    public function index(Request $request)
    {
        $query = RecruitmentJob::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('summary', 'like', '%' . $search . '%');
            });
        }

        return response()->json($query->orderBy('created_at', 'desc')->get());
    }

    public function show($idOrSlug)
    {
        if (is_numeric($idOrSlug)) {
            $job = RecruitmentJob::where('id', $idOrSlug)->orWhere('slug', $idOrSlug)->first();
        } else {
            $job = RecruitmentJob::where('slug', $idOrSlug)->first();
        }

        if (!$job) {
            return response()->json(['message' => 'Job posting not found'], 404);
        }

        return response()->json($job);
    }
}

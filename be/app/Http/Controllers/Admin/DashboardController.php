<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Article;
use App\Models\RecruitmentJob;
use App\Models\Lead;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'food_products' => Product::where('type', 'food')->count(),
            'cosmetic_products' => Product::where('type', 'cosmetic')->count(),
            'total_articles' => Article::count(),
            'total_jobs' => RecruitmentJob::count(),
            'pending_leads' => Lead::where('status', 'pending')->count(),
            'total_leads' => Lead::count(),
        ];

        $recentLeads = Lead::latest()->take(5)->get();

        $monthlyLeads = [
            ['label' => 'Tháng 1', 'value' => 8],
            ['label' => 'Tháng 2', 'value' => 14],
            ['label' => 'Tháng 3', 'value' => 12],
            ['label' => 'Tháng 4', 'value' => 22],
            ['label' => 'Tháng 5', 'value' => 18],
            ['label' => 'Tháng 6', 'value' => Lead::count() + 15],
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentLeads' => $recentLeads,
            'monthlyLeads' => $monthlyLeads,
        ]);
    }
}

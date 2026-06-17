<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Article;
use App\Models\RecruitmentJob;
use App\Models\Lead;
use App\Models\ProductQuestion;
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
            'total_questions' => ProductQuestion::count(),
            'replied_questions' => ProductQuestion::where('status', 'replied')->orWhereNotNull('answer')->count(),
            'pending_questions' => ProductQuestion::where('status', 'pending')->whereNull('answer')->count(),
        ];

        $recentLeads = Lead::latest()->take(5)->get();

        $monthlyLeads = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $month = $date->month;
            $year = $date->year;

            $count = Lead::whereMonth('created_at', $month)
                ->whereYear('created_at', $year)
                ->count();

            $monthlyLeads[] = [
                'label' => 'Tháng ' . $month,
                'value' => $count,
            ];
        }

        // Daily leads for the last 30 days
        $dailyLeads = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = Lead::whereDate('created_at', $date->toDateString())->count();
            $dailyLeads[] = [
                'label' => $date->format('d/m'),
                'value' => $count,
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentLeads' => $recentLeads,
            'monthlyLeads' => $monthlyLeads,
            'dailyLeads' => $dailyLeads,
        ]);
    }
}

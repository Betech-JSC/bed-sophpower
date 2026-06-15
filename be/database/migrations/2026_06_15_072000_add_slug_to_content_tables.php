<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Add slug columns
        Schema::table('products', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('name');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('title');
        });

        Schema::table('recruitment_jobs', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('title');
        });

        // 2. Data Migration: Products
        $products = DB::table('products')->get();
        foreach ($products as $product) {
            $nameJson = json_decode($product->name, true);
            $viName = $nameJson['vi'] ?? (is_string($nameJson) ? $nameJson : 'product');
            
            $baseSlug = Str::slug($viName);
            if (empty($baseSlug)) {
                $baseSlug = 'product-' . $product->id;
            }
            $slug = $baseSlug;
            $count = 1;
            while (DB::table('products')->where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count++;
            }

            DB::table('products')
                ->where('id', $product->id)
                ->update(['slug' => $slug]);
        }

        // 3. Data Migration: Articles
        $articles = DB::table('articles')->get();
        foreach ($articles as $article) {
            $titleJson = json_decode($article->title, true);
            $viTitle = $titleJson['vi'] ?? (is_string($titleJson) ? $titleJson : 'news');

            $baseSlug = Str::slug($viTitle);
            if (empty($baseSlug)) {
                $baseSlug = 'news-' . $article->id;
            }
            $slug = $baseSlug;
            $count = 1;
            while (DB::table('articles')->where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count++;
            }

            DB::table('articles')
                ->where('id', $article->id)
                ->update(['slug' => $slug]);
        }

        // 4. Data Migration: Recruitment Jobs
        $jobs = DB::table('recruitment_jobs')->get();
        foreach ($jobs as $job) {
            $titleJson = json_decode($job->title, true);
            $viTitle = $titleJson['vi'] ?? (is_string($titleJson) ? $titleJson : 'job');

            $baseSlug = Str::slug($viTitle);
            if (empty($baseSlug)) {
                $baseSlug = 'job-' . $job->id;
            }
            $slug = $baseSlug;
            $count = 1;
            while (DB::table('recruitment_jobs')->where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count++;
            }

            DB::table('recruitment_jobs')
                ->where('id', $job->id)
                ->update(['slug' => $slug]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recruitment_jobs', function (Blueprint $table) {
            $table->dropColumn('slug');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('slug');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};

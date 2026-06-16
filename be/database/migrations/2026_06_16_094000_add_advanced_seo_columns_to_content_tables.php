<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $tables = ['products', 'articles', 'recruitment_jobs', 'pages'];
        
        foreach ($tables as $t) {
            Schema::table($t, function (Blueprint $table) {
                $table->json('seo_keywords')->nullable()->after('seo_desc');
                $table->string('meta_robots')->nullable()->after('seo_keywords');
                $table->string('canonical_url')->nullable()->after('meta_robots');
                $table->string('og_image')->nullable()->after('canonical_url');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = ['products', 'articles', 'recruitment_jobs', 'pages'];
        
        foreach ($tables as $t) {
            Schema::table($t, function (Blueprint $table) {
                $table->dropColumn(['seo_keywords', 'meta_robots', 'canonical_url', 'og_image']);
            });
        }
    }
};

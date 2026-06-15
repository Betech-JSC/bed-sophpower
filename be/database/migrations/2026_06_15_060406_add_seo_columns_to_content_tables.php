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
        Schema::table('products', function (Blueprint $table) {
            $table->json('seo_title')->nullable()->after('type');
            $table->json('seo_desc')->nullable()->after('seo_title');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->json('seo_title')->nullable()->after('author');
            $table->json('seo_desc')->nullable()->after('seo_title');
        });

        Schema::table('recruitment_jobs', function (Blueprint $table) {
            $table->json('seo_title')->nullable()->after('benefits');
            $table->json('seo_desc')->nullable()->after('seo_title');
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->json('seo_title')->nullable()->after('content');
            $table->json('seo_desc')->nullable()->after('seo_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['seo_title', 'seo_desc']);
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['seo_title', 'seo_desc']);
        });

        Schema::table('recruitment_jobs', function (Blueprint $table) {
            $table->dropColumn(['seo_title', 'seo_desc']);
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn(['seo_title', 'seo_desc']);
        });
    }
};


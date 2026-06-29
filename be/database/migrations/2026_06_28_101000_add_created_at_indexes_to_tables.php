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
        Schema::table('articles', function (Blueprint $table) {
            $table->index('created_at');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->index('created_at');
        });

        Schema::table('recruitment_jobs', function (Blueprint $table) {
            $table->index('created_at');
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->index('created_at');
        });

        Schema::table('leads', function (Blueprint $table) {
            $table->index('created_at');
        });

        Schema::table('seo_redirects', function (Blueprint $table) {
            $table->index('created_at');
        });

        Schema::table('activity_logs', function (Blueprint $table) {
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });

        Schema::table('recruitment_jobs', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });

        Schema::table('leads', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });

        Schema::table('seo_redirects', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });

        Schema::table('activity_logs', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });
    }
};

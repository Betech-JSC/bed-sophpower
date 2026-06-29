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
            // Composite index for 'where status = published order by date desc, created_at desc'
            $table->index(['status', 'date', 'created_at'], 'articles_status_date_created_at_index');
        });

        Schema::table('products', function (Blueprint $table) {
            // Composite index for 'where status = published order by created_at desc'
            $table->index(['status', 'created_at'], 'products_status_created_at_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropIndex('articles_status_date_created_at_index');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_status_created_at_index');
        });
    }
};

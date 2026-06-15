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
        // 1. Create product_categories table
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->json('name');
            $table->string('slug')->unique();
            $table->string('type'); // food, cosmetic
            $table->timestamps();
        });

        // 2. Create article_categories table
        Schema::create('article_categories', function (Blueprint $table) {
            $table->id();
            $table->json('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        // 3. Add category_id columns to products and articles
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('product_category_id')->nullable()->constrained('product_categories')->onDelete('set null');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->foreignId('article_category_id')->nullable()->constrained('article_categories')->onDelete('set null');
        });

        // 4. Data Migration
        // Process Products
        $products = DB::table('products')->get();
        foreach ($products as $product) {
            $catJson = json_decode($product->category, true);
            if ($catJson && !empty($catJson['vi'])) {
                $viName = $catJson['vi'];
                
                // Find or create ProductCategory
                $existingCategory = DB::table('product_categories')
                    ->where('type', $product->type)
                    ->where('name->vi', $viName)
                    ->first();

                if ($existingCategory) {
                    $catId = $existingCategory->id;
                } else {
                    $baseSlug = Str::slug($viName);
                    if (empty($baseSlug)) {
                        $baseSlug = 'category';
                    }
                    $slug = $baseSlug;
                    $count = 1;
                    while (DB::table('product_categories')->where('slug', $slug)->exists()) {
                        $slug = $baseSlug . '-' . $count++;
                    }

                    $catId = DB::table('product_categories')->insertGetId([
                        'name' => json_encode($catJson),
                        'slug' => $slug,
                        'type' => $product->type,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                DB::table('products')
                    ->where('id', $product->id)
                    ->update(['product_category_id' => $catId]);
            }
        }

        // Process Articles
        $articles = DB::table('articles')->get();
        foreach ($articles as $article) {
            $catJson = json_decode($article->category, true);
            if ($catJson && !empty($catJson['vi'])) {
                $viName = $catJson['vi'];

                // Find or create ArticleCategory
                $existingCategory = DB::table('article_categories')
                    ->where('name->vi', $viName)
                    ->first();

                if ($existingCategory) {
                    $catId = $existingCategory->id;
                } else {
                    $baseSlug = Str::slug($viName);
                    if (empty($baseSlug)) {
                        $baseSlug = 'category';
                    }
                    $slug = $baseSlug;
                    $count = 1;
                    while (DB::table('article_categories')->where('slug', $slug)->exists()) {
                        $slug = $baseSlug . '-' . $count++;
                    }

                    $catId = DB::table('article_categories')->insertGetId([
                        'name' => json_encode($catJson),
                        'slug' => $slug,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                DB::table('articles')
                    ->where('id', $article->id)
                    ->update(['article_category_id' => $catId]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeign(['article_category_id']);
            $table->dropColumn('article_category_id');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['product_category_id']);
            $table->dropColumn('product_category_id');
        });

        Schema::dropIfExists('article_categories');
        Schema::dropIfExists('product_categories');
    }
};

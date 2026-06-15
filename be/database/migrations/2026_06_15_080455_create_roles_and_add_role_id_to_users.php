<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Create roles table
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->json('permissions');
            $table->timestamps();
        });

        // 2. Add role_id to users table
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->after('password')->constrained('roles')->onDelete('set null');
        });

        // 3. Seed default Super Admin role and assign to existing users
        $now = now();
        $superAdminRoleId = DB::table('roles')->insertGetId([
            'name' => 'Super Admin',
            'description' => 'Toàn quyền quản trị hệ thống',
            'permissions' => json_encode(['*']),
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        // Seed an Editor role for testing convenience
        DB::table('roles')->insert([
            'name' => 'Biên tập viên',
            'description' => 'Quản lý sản phẩm và tin bài',
            'permissions' => json_encode([
                'dashboard.view',
                'products.view',
                'products.manage',
                'product-categories.view',
                'product-categories.manage',
                'news.view',
                'news.manage',
                'article-categories.view',
                'article-categories.manage',
                'media.view',
                'media.manage',
            ]),
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        // Assign all existing users to Super Admin
        DB::table('users')->update(['role_id' => $superAdminRoleId]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
        });

        Schema::dropIfExists('roles');
    }
};

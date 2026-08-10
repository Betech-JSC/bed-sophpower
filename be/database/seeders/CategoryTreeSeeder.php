<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoryTreeSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Root Category: NGUYÊN LIỆU THỰC PHẨM
        $foodRoot = ProductCategory::updateOrCreate(
            ['slug' => 'nguyen-lieu-thuc-pham'],
            [
                'name' => ['vi' => 'NGUYÊN LIỆU THỰC PHẨM', 'en' => 'FOOD INGREDIENTS'],
                'type' => 'food',
                'parent_id' => null,
            ]
        );

        // Children of Food
        $foodChildren = [
            [
                'name' => ['vi' => 'Phụ gia', 'en' => 'Additives'],
                'slug' => 'phu-gia',
                'type' => 'food',
            ],
            [
                'name' => ['vi' => 'Bột trái cây', 'en' => 'Fruit Powders'],
                'slug' => 'bot-trai-cay',
                'type' => 'food',
            ],
            [
                'name' => ['vi' => 'Hương liệu', 'en' => 'Flavors'],
                'slug' => 'huong-lieu',
                'type' => 'food',
            ],
            [
                'name' => ['vi' => 'Chất tạo màu thực phẩm', 'en' => 'Food Coloring'],
                'slug' => 'chat-tao-mau-thuc-pham',
                'type' => 'food',
            ],
            [
                'name' => ['vi' => 'Chất làm dày & ổn định', 'en' => 'Thickeners & Stabilizers'],
                'slug' => 'chat-lam-day-o-dinh',
                'type' => 'food',
            ],
        ];

        foreach ($foodChildren as $child) {
            ProductCategory::updateOrCreate(
                ['slug' => $child['slug']],
                [
                    'name' => $child['name'],
                    'type' => $child['type'],
                    'parent_id' => $foodRoot->id,
                ]
            );
        }

        // Sub-children under Phụ gia (Level 3 demonstration)
        $phuGia = ProductCategory::where('slug', 'phu-gia')->first();
        if ($phuGia) {
            $subAdditives = [
                ['vi' => 'Chất bảo quản', 'en' => 'Preservatives', 'slug' => 'chat-bao-quan'],
                ['vi' => 'Chất điều vị', 'en' => 'Flavor Enhancers', 'slug' => 'chat-dieu-vi'],
            ];
            foreach ($subAdditives as $sub) {
                ProductCategory::updateOrCreate(
                    ['slug' => $sub['slug']],
                    [
                        'name' => ['vi' => $sub['vi'], 'en' => $sub['en']],
                        'type' => 'food',
                        'parent_id' => $phuGia->id,
                    ]
                );
            }
        }

        // 2. Root Category: NGUYÊN LIỆU MỸ PHẨM
        $cosmeticRoot = ProductCategory::updateOrCreate(
            ['slug' => 'nguyen-lieu-my-pham'],
            [
                'name' => ['vi' => 'NGUYÊN LIỆU MỸ PHẨM', 'en' => 'COSMETIC INGREDIENTS'],
                'type' => 'cosmetic',
                'parent_id' => null,
            ]
        );

        // Children of Cosmetic
        $cosmeticChildren = [
            [
                'name' => ['vi' => 'Hoạt chất dưỡng ẩm & Phục hồi', 'en' => 'Moisturizing & Recovery Active Ingredients'],
                'slug' => 'hoat-chat-duong-am-phuc-hoi',
                'type' => 'cosmetic',
            ],
            [
                'name' => ['vi' => 'Chiết xuất thiên nhiên', 'en' => 'Natural Extracts'],
                'slug' => 'chiet-xuat-thien-nhien',
                'type' => 'cosmetic',
            ],
            [
                'name' => ['vi' => 'Vitamin & Hoạt chất sinh học', 'en' => 'Vitamins & Bioactives'],
                'slug' => 'vitamin-hoat-chat-sinh-hoc',
                'type' => 'cosmetic',
            ],
        ];

        foreach ($cosmeticChildren as $child) {
            ProductCategory::updateOrCreate(
                ['slug' => $child['slug']],
                [
                    'name' => $child['name'],
                    'type' => $child['type'],
                    'parent_id' => $cosmeticRoot->id,
                ]
            );
        }

        // Update existing floating categories to point to their respective root if unassigned
        ProductCategory::whereNull('parent_id')
            ->whereNotIn('id', [$foodRoot->id, $cosmeticRoot->id])
            ->where('type', 'food')
            ->update(['parent_id' => $foodRoot->id]);

        ProductCategory::whereNull('parent_id')
            ->whereNotIn('id', [$foodRoot->id, $cosmeticRoot->id])
            ->where('type', 'cosmetic')
            ->update(['parent_id' => $cosmeticRoot->id]);
    }
}

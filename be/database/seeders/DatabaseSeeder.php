<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Article;
use App\Models\RecruitmentJob;
use App\Models\Lead;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Default Admin User
        User::updateOrCreate(
            ['email' => 'admin@sophpower.com'],
            [
                'name' => 'Sophpower Admin',
                'password' => Hash::make('admin123'),
            ]
        );

        // 2. Seed Products
        $products = [
            // Food Ingredients
            [
                'id' => 16,
                'name' => ['vi' => 'Bột Beta-carotene', 'en' => 'Beta-carotene Powder'],
                'category' => ['vi' => 'Chất tạo màu thực phẩm', 'en' => 'Food Coloring'],
                'desc' => [
                    'vi' => 'Bột Beta-carotene là chất tạo màu tự nhiên cao cấp, có màu vàng cam đến cam đậm đặc trưng. Sản phẩm được sử dụng phổ biến trong chế biến thực phẩm và sản xuất dược phẩm nhờ khả năng chống oxy hóa mạnh mẽ và bổ sung tiền chất Vitamin A.',
                    'en' => 'Beta-carotene Powder is a premium natural food coloring, featuring a characteristic yellow-orange to deep orange shade. It is widely used in food processing and pharmaceuticals for its strong antioxidant properties and as a Vitamin A precursor.'
                ],
                'image' => '/images/products/beta-carotene-powder.jpg',
                'specs' => [
                    'vi' => ['Hàm lượng: 1%, 10%, 20%', 'Trạng thái: Bột mịn tan hoàn toàn trong nước', 'Hạn sử dụng: 24 tháng kể từ ngày sản xuất'],
                    'en' => ['Content: 1%, 10%, 20%', 'State: Fine powder, completely soluble in water', 'Shelf life: 24 months from manufacturing date']
                ],
                'applications' => [
                    'vi' => ['Sản xuất nước quả, nước ngọt giải khát', 'Chế biến bánh kẹo, thạch rau câu', 'Bổ sung dinh dưỡng trong thực phẩm chức năng'],
                    'en' => ['Fruit juice and soft drink production', 'Confectionery and jelly processing', 'Nutritional enrichment in functional foods']
                ],
                'packaging' => ['vi' => 'Thùng 20kg hoặc đóng gói theo yêu cầu.', 'en' => '20kg drum or custom packaging.'],
                'type' => 'food',
            ],
            [
                'id' => 17,
                'name' => ['vi' => 'Nhũ tương Beta-carotene', 'en' => 'Beta-carotene Emulsion'],
                'category' => ['vi' => 'Chất tạo màu thực phẩm', 'en' => 'Food Coloring'],
                'desc' => [
                    'vi' => 'Nhũ tương Beta-carotene là dạng lỏng phân tán nước ổn định cao, giúp tạo màu vàng tươi tự nhiên mà không bị phân lớp hay nổi váng dầu trên bề mặt nước giải khát.',
                    'en' => 'Beta-carotene Emulsion is a highly stable, water-dispersible liquid form that imparts a bright, natural yellow color without separation or oil ringing on the surface of beverages.'
                ],
                'image' => '/images/products/beta-carotene-emulsion.png',
                'specs' => [
                    'vi' => ['Hàm lượng: 1% đến 5% Lỏng', 'Trạng thái: Nhũ tương lỏng màu cam', 'Độ ổn định: Chịu nhiệt tốt, kháng axit cao'],
                    'en' => ['Content: 1% to 5% Liquid', 'State: Orange liquid emulsion', 'Stability: Excellent heat and high acid resistance']
                ],
                'applications' => [
                    'vi' => ['Đồ uống có gas và nước trái cây không gas', 'Các sản phẩm sữa, sữa chua uống', 'Sốt và gia vị thực phẩm'],
                    'en' => ['Carbonated and non-carbonated fruit drinks', 'Dairy products and drinkable yogurts', 'Sauces and food seasonings']
                ],
                'packaging' => ['vi' => 'Can 25kg hoặc phuy nhựa.', 'en' => '25kg jerrycan or plastic drum.'],
                'type' => 'food',
            ],
            [
                'id' => 15,
                'name' => ['vi' => 'Màu đỏ Carmine (E120)', 'en' => 'Carmine Red Color (E120)'],
                'category' => ['vi' => 'Màu đỏ thực phẩm tự nhiên', 'en' => 'Natural Food Coloring'],
                'desc' => [
                    'vi' => 'Màu đỏ Carmine (E120) chiết xuất từ côn trùng cochineal tự nhiên, đem lại tông màu đỏ tươi bền vững với ánh sáng và nhiệt độ cao, thích hợp cho nhiều dây chuyền chế biến thực phẩm khắt khe.',
                    'en' => 'Carmine Red (E120) is extracted from natural cochineal insects, providing a vivid red hue highly stable to light and heat, suitable for demanding food processing lines.'
                ],
                'image' => '/images/products/carmine.png',
                'specs' => [
                    'vi' => ['Dạng: Bột hoặc lỏng', 'Độ bền màu: Rất cao khi chịu nhiệt và ánh sáng', 'Tiêu chuẩn: FDA, HACCP'],
                    'en' => ['Form: Powder or liquid', 'Color stability: Very high under heat and light', 'Standard: FDA, HACCP']
                ],
                'applications' => [
                    'vi' => ['Xúc xích, giò chả, lạp xưởng và thịt chế biến', 'Nước ngọt, thạch, si rô đỏ', 'Mỹ phẩm son môi, phấn má'],
                    'en' => ['Sausages, Vietnamese ham, and processed meats', 'Soft drinks, jellies, and red syrups', 'Cosmetics like lipsticks and blushes']
                ],
                'packaging' => ['vi' => 'Thùng 20kg hoặc chai lỏng 1kg.', 'en' => '20kg drum or 1kg liquid bottle.'],
                'type' => 'food',
            ],
            [
                'id' => 18,
                'name' => ['vi' => 'Màu Tím Tự Nhiên', 'en' => 'Natural Purple Color'],
                'category' => ['vi' => 'Chất tạo màu thực phẩm', 'en' => 'Food Coloring'],
                'desc' => [
                    'vi' => 'Sản phẩm mang lại sắc tím tự nhiên rực rỡ, được chiết xuất từ nguồn thực vật hữu cơ lành tính, đảm bảo độ an toàn tuyệt đối cho người tiêu dùng.',
                    'en' => 'This product delivers a vibrant natural purple hue, extracted from safe organic plant sources, ensuring absolute safety for consumers.'
                ],
                'image' => '/images/products/mau-tim-tu-nhien.png',
                'specs' => [
                    'vi' => ['Dạng: Bột mịn màu tím sẫm', 'Độ tan: Tan tốt trong nước ấm', 'Chứng nhận: HALAL, ISO 22000'],
                    'en' => ['Form: Dark purple fine powder', 'Solubility: Soluble in warm water', 'Certification: HALAL, ISO 22000']
                ],
                'applications' => [
                    'vi' => ['Bánh ngọt, kem, các loại mứt trái cây', 'Nước uống hương việt quất, nho', 'Kẹo dẻo và thạch'],
                    'en' => ['Pastries, ice creams, and fruit jams', 'Blueberry and grape flavored beverages', 'Gummy candies and jellies']
                ],
                'packaging' => ['vi' => 'Túi zip 5kg, thùng 25kg.', 'en' => '5kg zip bag, 25kg carton.'],
                'type' => 'food',
            ],
            [
                'id' => 12,
                'name' => ['vi' => 'Flavors (Hương liệu phụ gia)', 'en' => 'Flavors (Food Flavorings)'],
                'category' => ['vi' => 'Hương liệu phụ gia', 'en' => 'Food Flavorings'],
                'desc' => [
                    'vi' => 'Chúng tôi cung cấp dải hương liệu thực phẩm phong phú, từ hương hoa quả nhiệt đới đến hương sữa ngậy, giúp tối ưu hóa cảm quan hương vị cho các loại thực phẩm và đồ uống.',
                    'en' => 'We offer a wide range of food flavorings, from tropical fruit notes to rich dairy profiles, optimizing the sensory flavor experience for various foods and beverages.'
                ],
                'image' => '/images/products/flavors.jpg',
                'specs' => [
                    'vi' => ['Dạng: Lỏng hoặc bột', 'Hương vị: Cam, dâu, xoài, sữa, vanilla, v.v.', 'Đặc tính: Giữ hương thơm lâu sau chế biến'],
                    'en' => ['Form: Liquid or powder', 'Flavors: Orange, strawberry, mango, milk, vanilla, etc.', 'Features: Long-lasting aroma after processing']
                ],
                'applications' => [
                    'vi' => ['Nước giải khát, trà sữa, cà phê đóng chai', 'Bánh kẹo, kem lạnh', 'Sữa và các chế phẩm từ sữa'],
                    'en' => ['Beverages, bubble teas, bottled coffees', 'Confectionery, ice creams', 'Milk and dairy products']
                ],
                'packaging' => ['vi' => 'Can 5kg, phuy 25kg hoặc theo đơn hàng.', 'en' => '5kg jerrycan, 25kg drum, or custom orders.'],
                'type' => 'food',
            ],
            [
                'id' => 11,
                'name' => ['vi' => 'Coconut Water Powder', 'en' => 'Coconut Water Powder'],
                'category' => ['vi' => 'Bột nước quả', 'en' => 'Fruit Juice Powder'],
                'desc' => [
                    'vi' => 'Bột nước dừa nguyên chất sấy phun giữ trọn hương vị ngọt thanh tự nhiên và các chất điện giải cần thiết, dùng làm nguyên liệu pha chế đồ uống dinh dưỡng thể thao.',
                    'en' => 'Spray-dried pure coconut water powder preserves the natural sweet, refreshing flavor and essential electrolytes, ideal as an ingredient for sports and nutritional drinks.'
                ],
                'image' => '/images/products/coconut-water-powder.jpg',
                'specs' => [
                    'vi' => ['Độ ẩm: Dưới 5%', 'Độ hòa tan: 100% trong nước lạnh', 'Nguồn gốc: Dừa tươi Bến Tre chọn lọc'],
                    'en' => ['Moisture: Under 5%', 'Solubility: 100% soluble in cold water', 'Origin: Selected fresh Ben Tre coconuts']
                ],
                'applications' => [
                    'vi' => ['Bột uống bù khoáng thể thao', 'Hòa trộn trà trái cây túi lọc', 'Sinh tố và thực phẩm ăn kiêng'],
                    'en' => ['Rehydration sports powders', 'Fruit tea bag blends', 'Smoothies and dietetic foods']
                ],
                'packaging' => ['vi' => 'Túi nhôm 1kg, thùng carton 15kg.', 'en' => '1kg aluminum bag, 15kg carton.'],
                'type' => 'food',
            ],
            [
                'id' => 10,
                'name' => ['vi' => 'Compound Thickening Stabilizer', 'en' => 'Compound Thickening Stabilizer'],
                'category' => ['vi' => 'Chất làm dày ổn định', 'en' => 'Thickeners & Stabilizers'],
                'desc' => [
                    'vi' => 'Hệ phụ gia làm dày và ổn định phức hợp giúp tạo độ sánh mượt đồng đều, cải thiện cấu trúc sản phẩm và hạn chế hiện tượng tách nước trong suốt thời hạn bảo quản.',
                    'en' => 'A compound thickening and stabilizing additive system that provides uniform smoothness, improves product structure, and prevents water separation during shelf life.'
                ],
                'image' => '/images/products/thickening-stabilizer.jpg',
                'specs' => [
                    'vi' => ['Thành phần: Xanthan Gum, Guar Gum, CMC phối trộn', 'Độ nhớt: Tùy chỉnh theo ứng dụng', 'Độ an toàn: Đáp ứng tiêu chuẩn JECFA'],
                    'en' => ['Ingredients: Blend of Xanthan Gum, Guar Gum, CMC', 'Viscosity: Tailored to application', 'Safety: Meets JECFA standards']
                ],
                'applications' => [
                    'vi' => ['Sữa chua, sữa đậu nành, kem tươi', 'Nước tương, nước sốt chấm, tương ớt', 'Bột bánh mì ngọt chế biến sẵn'],
                    'en' => ['Yogurt, soy milk, fresh cream', 'Soy sauce, dipping sauces, chili sauce', 'Pre-mixed sweet bread mixes']
                ],
                'packaging' => ['vi' => 'Bao giấy 25kg.', 'en' => '25kg paper bag.'],
                'type' => 'food',
            ],
            [
                'id' => 9,
                'name' => ['vi' => 'Compound Juice Stabilizer', 'en' => 'Compound Juice Stabilizer'],
                'category' => ['vi' => 'Chất ổn định nước quả', 'en' => 'Juice Stabilizers'],
                'desc' => [
                    'vi' => 'Hệ ổn định chuyên biệt cho nước ép trái cây giúp liên kết tế bào thịt quả lơ lửng đều trong chai, chống phân lớp tách pha rõ rệt và tạo cảm giác ngon miệng hơn khi uống.',
                    'en' => 'A specialized stabilizing system for fruit juices that suspends pulp particles uniformly, preventing phase separation and enhancing mouthfeel.'
                ],
                'image' => '/images/products/juice-stabilizer.jpg',
                'specs' => [
                    'vi' => ['Đặc tính: Tạo hệ nhũ lơ lửng tốt ở pH axit', 'Liều lượng sử dụng: 0.1% - 0.3%', 'Trạng thái: Bột màu trắng sữa'],
                    'en' => ['Features: Excellent suspension in acidic pH', 'Dosage: 0.1% - 0.3%', 'State: Milky white powder']
                ],
                'applications' => [
                    'vi' => ['Nước cam ép, nước táo ép có thịt quả', 'Nước sinh tố đóng chai', 'Nước nha đam hạt chia'],
                    'en' => ['Orange and apple juices with pulp', 'Bottled smoothies', 'Aloe vera drinks with chia seeds']
                ],
                'packaging' => ['vi' => 'Bao giấy 25kg có lót túi PE.', 'en' => '25kg paper bag with PE liner.'],
                'type' => 'food',
            ],
            // Cosmetic Ingredients
            [
                'id' => 3,
                'name' => ['vi' => 'Niacinamide (Vitamin B3)', 'en' => 'Niacinamide (Vitamin B3)'],
                'category' => ['vi' => 'Nguyên liệu mỹ phẩm', 'en' => 'Cosmetic Ingredients'],
                'desc' => [
                    'vi' => 'Niacinamide là một dạng Vitamin B3 tan trong nước, được biết đến rộng rãi với khả năng cải thiện tình trạng da toàn diện và củng cố hàng rào bảo vệ da.',
                    'en' => 'Niacinamide is a water-soluble form of Vitamin B3, widely recognized for its ability to improve overall skin condition and strengthen the skin barrier.'
                ],
                'image' => '/images/products/niacinamide.jpg',
                'specs' => [
                    'vi' => ['Độ tinh khiết: >= 99%', 'Độ an toàn: Rất cao, không kích ứng da', 'Dạng: Bột tinh thể màu trắng'],
                    'en' => ['Purity: >= 99%', 'Safety: Very high, non-irritating', 'Form: White crystalline powder']
                ],
                'applications' => [
                    'vi' => ['Kem làm sáng da, giảm thâm nám', 'Serum se khít lỗ chân lông', 'Kem dưỡng phục hồi hàng rào bảo vệ da'],
                    'en' => ['Skin brightening and spot-reducing creams', 'Pore-tightening serums', 'Barrier-repair moisturizers']
                ],
                'packaging' => ['vi' => 'Bao bì 25kg hoặc hộp nhôm 1kg.', 'en' => '25kg packaging or 1kg aluminum container.'],
                'type' => 'cosmetic',
            ],
            [
                'id' => 4,
                'name' => ['vi' => 'Panthenol', 'en' => 'Panthenol'],
                'category' => ['vi' => 'Nguyên liệu mỹ phẩm', 'en' => 'Cosmetic Ingredients'],
                'desc' => [
                    'vi' => 'Panthenol là tiền chất của Vitamin B5, nổi tiếng với các đặc tính dưỡng ẩm, làm dịu, hỗ trợ phục hồi làn da bị tổn thương đồng thời mang lại độ đàn hồi mịn màng.',
                    'en' => 'Panthenol is a precursor to Vitamin B5, famous for its moisturizing, soothing, and skin-repair properties while providing smooth elasticity.'
                ],
                'image' => '/images/products/panthenol.jpg',
                'specs' => [
                    'vi' => ['Dạng: Chất lỏng sệt không màu', 'Đặc tính: Cấp ẩm sâu, phục hồi da nhanh chóng', 'Hạn sử dụng: 24 tháng'],
                    'en' => ['Form: Colorless viscous liquid', 'Properties: Deep hydration, rapid skin recovery', 'Shelf life: 24 months']
                ],
                'applications' => [
                    'vi' => ['Kem dưỡng ẩm, phục hồi da sau mụn', 'Sữa tắm và dầu gội dưỡng tóc', 'Serum phục hồi da nhạy cảm'],
                    'en' => ['Moisturizing and post-acne repair creams', 'Body washes and hair nourishing shampoos', 'Sensitive skin recovery serums']
                ],
                'packaging' => ['vi' => 'Chai 1kg, can 25kg.', 'en' => '1kg bottle, 25kg jerrycan.'],
                'type' => 'cosmetic',
            ],
            [
                'id' => 5,
                'name' => ['vi' => 'Tranexamic Acid', 'en' => 'Tranexamic Acid'],
                'category' => ['vi' => 'Nguyên liệu mỹ phẩm', 'en' => 'Cosmetic Ingredients'],
                'desc' => [
                    'vi' => 'Tranexamic Acid là một hoạt chất được ứng dụng rộng rãi trong các sản phẩm làm sáng da, mờ thâm nám và cải thiện các vùng da không đều màu.',
                    'en' => 'Tranexamic Acid is an active ingredient widely applied in skin brightening products to fade spots and improve uneven skin tone.'
                ],
                'image' => '/images/products/tranexamic-acid.jpg',
                'specs' => [
                    'vi' => ['Hàm lượng: >= 99%', 'Công dụng: Làm sáng da, trị thâm nám chuyên sâu', 'Trạng thái: Bột trắng kết tinh'],
                    'en' => ['Purity: >= 99%', 'Function: Intensive brightening & hyperpigmentation treatment', 'State: White crystalline powder']
                ],
                'applications' => [
                    'vi' => ['Kem trị nám chuyên sâu B2B', 'Serum dưỡng sáng da mờ thâm', 'Kem chống nắng kết hợp làm sáng da'],
                    'en' => ['Intensive B2B melasma treatment creams', 'Brightening and spot-fading serums', 'Brightening sunscreens']
                ],
                'packaging' => ['vi' => 'Bao bì 25kg hoặc đóng túi 1kg.', 'en' => '25kg packaging or 1kg bag packaging.'],
                'type' => 'cosmetic',
            ],
            [
                'id' => 6,
                'name' => ['vi' => 'Proxylane', 'en' => 'Proxylane'],
                'category' => ['vi' => 'Nguyên liệu mỹ phẩm', 'en' => 'Cosmetic Ingredients'],
                'desc' => [
                    'vi' => 'Proxylane là một hoạt chất đa năng có khả năng chống lão hóa hiệu quả cao, kích thích tổng hợp collagen, tăng mật độ và độ đàn hồi cho da.',
                    'en' => 'Proxylane is a versatile active ingredient with highly effective anti-aging properties, stimulating collagen synthesis to increase skin density and elasticity.'
                ],
                'image' => '/images/products/proxylane.jpg',
                'specs' => [
                    'vi' => ['Cơ chế: Kích thích GAGs, củng cố liên kết biểu bì', 'Mục tiêu: Chống lão hóa, giảm nếp nhăn', 'Trạng thái: Chất lỏng sệt màu nâu nhạt'],
                    'en' => ['Mechanism: Stimulates GAGs, strengthens epidermal junctions', 'Goal: Anti-aging, wrinkle reduction', 'State: Light brown viscous liquid']
                ],
                'applications' => [
                    'vi' => ['Kem dưỡng trẻ hóa da cao cấp', 'Serum nâng cơ mặt chuyên sâu', 'Kem mắt giảm nếp nhăn chân chim'],
                    'en' => ['Premium youth-activating creams', 'Intensive face lifting serums', 'Anti-crow\'s feet eye creams']
                ],
                'packaging' => ['vi' => 'Lọ 1kg hoặc can 10kg.', 'en' => '1kg bottle or 10kg jerrycan.'],
                'type' => 'cosmetic',
            ],
            [
                'id' => 7,
                'name' => ['vi' => 'Ectoin', 'en' => 'Ectoin'],
                'category' => ['vi' => 'Nguyên liệu mỹ phẩm', 'en' => 'Cosmetic Ingredients'],
                'desc' => [
                    'vi' => 'Ectoin là một dẫn xuất axit amin tự nhiên mạnh mẽ, giúp bảo vệ và ổn định các tế bào da trước các tác nhân gây hại từ môi trường bên ngoài.',
                    'en' => 'Ectoin is a powerful natural amino acid derivative that protects and stabilizes skin cells against external environmental stressors.'
                ],
                'image' => '/images/products/ectoin.jpg',
                'specs' => [
                    'vi' => ['Đặc tính: Tạo màng chắn phân tử nước bảo vệ da', 'Chứng nhận: Cosmos Organic', 'Trạng thái: Bột mịn màu trắng'],
                    'en' => ['Properties: Forms a protective water-binding shield', 'Certification: Cosmos Organic', 'State: White fine powder']
                ],
                'applications' => [
                    'vi' => ['Kem dưỡng bảo vệ da trước tia UV và bụi mịn PM2.5', 'Serum chống lão hóa kháng viêm', 'Kem dưỡng ẩm sâu cho da nhạy cảm'],
                    'en' => ['UV and PM2.5 anti-pollution creams', 'Anti-aging and anti-inflammatory serums', 'Deep moisturizers for sensitive skin']
                ],
                'packaging' => ['vi' => 'Hộp 1kg hoặc bao 25kg.', 'en' => '1kg box or 25kg bag.'],
                'type' => 'cosmetic',
            ],
            [
                'id' => 8,
                'name' => ['vi' => 'Rosa Damascena Flower Water', 'en' => 'Rosa Damascena Flower Water'],
                'category' => ['vi' => 'Nguyên liệu mỹ phẩm', 'en' => 'Cosmetic Ingredients'],
                'desc' => [
                    'vi' => 'Nước hoa hồng Damask chưng cất tự nhiên, giàu hoạt chất hỗ trợ cấp ẩm sâu, chống oxy hóa và nuôi dưỡng làn da tươi sáng rạng ngời.',
                    'en' => 'Steam-distilled natural Damask rose water, rich in active components that provide deep hydration, antioxidant protection, and nourish a bright, glowing complexion.'
                ],
                'image' => '/images/products/rosa-water.jpg',
                'specs' => [
                    'vi' => ['Nguồn gốc: Cánh hoa hồng Damask chưng cất hơi nước', 'Hương thơm: Hoa hồng tự nhiên thanh mát', 'Chứng nhận: 100% Organic'],
                    'en' => ['Origin: Steam-distilled Damask rose petals', 'Aroma: Fresh natural rose scent', 'Certification: 100% Organic']
                ],
                'applications' => [
                    'vi' => ['Toner cấp ẩm, cân bằng độ pH da', 'Xịt khoáng làm dịu da tức thì', 'Làm pha nước trong các công thức kem dưỡng và serum cao cấp'],
                    'en' => ['Hydrating and pH balancing toners', 'Instant soothing face mists', 'Aqueous phase for premium creams and serums']
                ],
                'packaging' => ['vi' => 'Can nhựa 25kg hoặc phuy 200kg.', 'en' => '25kg plastic jerrycan or 200kg drum.'],
                'type' => 'cosmetic',
            ],
        ];

        foreach ($products as $prod) {
            Product::updateOrCreate(['id' => $prod['id']], $prod);
        }

        // 3. Seed Articles
        $articles = [
            [
                'id' => 1,
                'title' => [
                    'vi' => 'Xu Hướng Mỹ Phẩm Thiên Nhiên 2026 – Vì Sao Rosa Damascena Flower Water Được Ưa Chuộng Trong Các Dòng Skincare Hiện Đại?',
                    'en' => 'Natural Cosmetic Trends 2026 – Why Rosa Damascena Flower Water is Favored in Modern Skincare?'
                ],
                'summary' => [
                    'vi' => 'Năm 2026, xu hướng làm đẹp tại Việt Nam đang thay đổi rõ rệt khi người tiêu dùng ngày càng ưu tiên các sản phẩm có nguồn gốc tự nhiên và mang lại cảm giác dịu nhẹ cho da. Tìm hiểu lý do nước hoa hồng Damask (Rosa Damascena) trở thành xu thế...',
                    'en' => 'In 2026, beauty trends in Vietnam are shifting towards natural ingredients. Discover why Damask Rose Water (Rosa Damascena) is emerging as a dominant trend...'
                ],
                'content' => [
                    'vi' => "Năm 2026 chứng kiến bước chuyển mình ngoạn mục của ngành công nghiệp làm đẹp khi định nghĩa về chăm sóc da không chỉ gói gọn trong hiệu quả nhanh mà là sự kết hợp bền vững giữa sức khỏe làn da và nguyên liệu thiên nhiên. Nổi bật nhất là Rosa Damascena Flower Water (nước chưng cất hoa hồng Damask) – được mệnh danh là nữ hoàng dưỡng ẩm tự nhiên.\n\nNhờ phương pháp chưng cất lôi cuốn hơi nước truyền thống, Rosa Damascena Flower Water giữ trọn vẹn các thành phần chống oxy hóa mạnh mẽ, tinh dầu tự nhiên và vitamin giúp cấp ẩm tức thì, phục hồi hàng rào bảo vệ da, đồng thời làm dịu nhanh chóng các tổn thương do môi trường đô thị như ô nhiễm hay bụi mịn PM2.5. Hơn nữa, mùi hương tự nhiên vô cùng thư thái của hoa hồng Damask đem lại giá trị trị liệu tinh thần (aromatherapy) rất cao cho người sử dụng.",
                    'en' => "2026 witnesses a spectacular transformation in the beauty industry where skincare is defined by sustainable health and natural ingredients. Foremost among these is Rosa Damascena Flower Water, known as the queen of natural moisturization.\n\nProduced via traditional steam distillation, Rosa Damascena Flower Water retains powerful antioxidants, essential oils, and vitamins that immediately hydrate skin, restore the skin barrier, and soothe environmental stress like urban pollution or PM2.5. Additionally, the natural calming scent of Damask rose offers high aromatherapy value to users."
                ],
                'date' => '2026-06-08',
                'image' => '/images/news/news1.png',
                'category' => ['vi' => 'Nguyên liệu mỹ phẩm', 'en' => 'Cosmetic Ingredients'],
                'author' => 'Sophpower R&D',
            ],
            [
                'id' => 2,
                'title' => [
                    'vi' => 'Vì Sao Tranexamic Acid Được Nhiều Thương Hiệu Skincare Ứng Dụng Trong Mỹ Phẩm Hiện Đại?',
                    'en' => 'Why Tranexamic Acid is Widely Applied by Skincare Brands in Modern Cosmetics?'
                ],
                'summary' => [
                    'vi' => 'Thị trường skincare đang thay đổi theo hướng chuyên sâu và cá nhân hóa trải nghiệm. Tranexamic Acid đang là hoạt chất nổi tiếng giúp điều trị sạm nám và làm sáng da vượt trội được nhiều nhãn hàng ưu tiên lựa chọn...',
                    'en' => 'The skincare market is moving towards specialized treatments. Tranexamic Acid is currently a highly popular active ingredient for hyperpigmentation treatment...'
                ],
                'content' => [
                    'vi' => "Tranexamic Acid (TXA) ban đầu được sử dụng trong y khoa như một chất cầm máu, tuy nhiên trong những năm gần đây, hoạt chất này đã bùng nổ trong ngành da liễu nhờ khả năng ức chế mạnh mẽ enzyme plasmin – tác nhân kích hoạt tế bào hắc sắc tố melanocytes sản sinh ra melanin khi da tiếp xúc với tia UV hoặc bị viêm.\n\nƯu điểm nổi bật của Tranexamic Acid so với các chất làm sáng truyền thống như Hydroquinone hay Vitamin C là độ lành tính cực kỳ cao, ít gây châm chích hay đỏ da, đồng thời đặc biệt hiệu quả trên các vết thâm đỏ sau mụn (PIE) và nám mảng do nội tiết tố. Hoạt chất này hiện được các nhà máy gia công mỹ phẩm hàng đầu kết hợp cùng Niacinamide để tạo hiệu ứng cộng hưởng làm sáng da đa mục tiêu.",
                    'en' => "Tranexamic Acid (TXA) was initially used in medicine as a hemostatic agent, but in recent years, this active ingredient has exploded in dermatology. It effectively inhibits plasmin enzymes, which trigger melanocytes to produce melanin under UV exposure or inflammation.\n\nThe key advantage of Tranexamic Acid over traditional brighteners like Hydroquinone or Vitamin C is its high tolerance, causing minimal irritation, while being exceptionally effective on post-inflammatory erythema (PIE) and hormonal melasma. It is now paired with Niacinamide in cosmetic manufacturing for a synergistic brightening effect."
                ],
                'date' => '2026-06-07',
                'image' => '/images/products/tranexamic-acid.jpg',
                'category' => ['vi' => 'Nguyên liệu mỹ phẩm', 'en' => 'Cosmetic Ingredients'],
                'author' => 'Sophpower Lab',
            ],
            [
                'id' => 3,
                'title' => [
                    'vi' => 'Thị Trường Mỹ Phẩm Việt Nam Đang Thay Đổi Theo Xu Hướng Nào?',
                    'en' => 'What Trends are Shaping the Vietnamese Cosmetic Market?'
                ],
                'summary' => [
                    'vi' => 'Trong những năm gần đây, thói quen tiêu dùng mỹ phẩm tại Việt Nam thay đổi nhanh chóng. Khách hàng không chỉ quan tâm đến thương hiệu mà bắt đầu đọc kỹ bảng thành phần, hướng đến Clean Beauty và tính minh bạch...',
                    'en' => 'In recent years, cosmetic consumption habits in Vietnam have shifted. Customers now scrutinize ingredient lists, leaning towards Clean Beauty and transparency...'
                ],
                'content' => [
                    'vi' => "Thị trường tiêu dùng mỹ phẩm tại Việt Nam không còn dễ tính như trước. Với sự hỗ trợ của mạng xã hội và các cộng đồng làm đẹp, người tiêu dùng ngày nay đã chuyển mình thành những \"skintellectuals\" (người tiêu dùng thông thái có hiểu biết sâu về thành phần).\n\nHọ hướng mạnh tới xu hướng Clean Beauty (Mỹ phẩm sạch) và chú trọng vào bảng thành phần minh bạch, an toàn. Các thành phần hoạt tính như Ectoin, Panthenol B5 và các chiết xuất thảo mộc hữu cơ đang vượt lên hàng đầu. Do đó, các thương hiệu nội địa bắt buộc phải cải tiến công thức, nhập khẩu nguyên liệu chất lượng cao từ các nhà cung ứng chính ngạch như Sophpower để duy trì vị thế cạnh tranh trên thị trường.",
                    'en' => "The Vietnamese cosmetic consumer market is increasingly sophisticated. Guided by social media and beauty communities, consumers have evolved into 'skintellectuals' with a deep understanding of formulations.\n\nThey strongly favor Clean Beauty and transparent, safe ingredient lists. Active components like Ectoin, Panthenol B5, and organic botanical extracts are taking center stage. Consequently, domestic brands must refine their formulas and source premium ingredients from authorized distributors like Sophpower to stay competitive."
                ],
                'date' => '2026-06-05',
                'image' => '/images/products/niacinamide.jpg',
                'category' => ['vi' => 'Thị trường', 'en' => 'Market'],
                'author' => 'Sophpower Lab',
            ],
            [
                'id' => 4,
                'title' => [
                    'vi' => 'Xu Hướng Nước Trái Cây Tại Việt Nam 2026 – Vì Sao Độ Ổn Định Sản Phẩm Ngày Càng Quan Trọng?',
                    'en' => 'Juice Trends in Vietnam 2026 – Why Product Stability is More Critical Than Ever?'
                ],
                'summary' => [
                    'vi' => 'Năm 2026, thị trường đồ uống lành mạnh bùng nổ kéo theo yêu cầu khắt khe về mặt cảm quan nước ép quả. Việc giải quyết các bài toán tách lớp, lắng cặn bằng chất ổn định phức hợp đang là chìa khóa cạnh tranh...',
                    'en' => 'In 2026, the healthy beverage market is booming, bringing strict sensory demands for fruit juices. Solving separation and settling with stabilizer complexes is key...'
                ],
                'content' => [
                    'vi' => "Xu hướng sống xanh và lành mạnh thúc đẩy người tiêu dùng Việt Nam lựa chọn các loại nước ép trái cây tự nhiên, sinh tố đóng chai và sữa thực vật. Tuy nhiên, thách thức lớn nhất của các nhà sản xuất F&B là hiện tượng tách lớp, phân tầng thịt quả hoặc lắng cặn trong quá trình lưu kho và trưng bày trên kệ siêu thị.\n\nĐể giải quyết triệt độ bài toán cảm quan này mà không làm ảnh hưởng đến mùi vị tự nhiên của nước trái cây, các chất ổn định làm dày phức hợp (như Xanthan, Guar Gum phối trộn) đang được ứng dụng rộng rãi. Các hệ ổn định này giúp tạo ra liên kết mạng lưới lơ lửng, giữ cho thịt quả phân tán đồng đều, duy trì độ mịn màng cho sản phẩm, từ đó nâng cao giá trị thương hiệu và trải nghiệm của người tiêu dùng.",
                    'en' => "The green living trend drives Vietnamese consumers to choose natural fruit juices, bottled smoothies, and plant-based milks. However, the biggest challenge for F&B manufacturers is pulp separation, stratification, or settling during warehousing and shelf display.\n\nTo resolve this sensory issue without altering the natural flavor of the juice, complex thickening stabilizers (like Xanthan and Guar Gum blends) are widely applied. These systems create a suspended network that disperses fruit pulp evenly, maintaining product smoothness and elevating brand value and user experience."
                ],
                'date' => '2026-06-02',
                'image' => '/images/products/juice-stabilizer.jpg',
                'category' => ['vi' => 'Nguyên liệu thực phẩm', 'en' => 'Food Ingredients'],
                'author' => 'Sophpower F&B',
            ],
        ];

        foreach ($articles as $art) {
            Article::updateOrCreate(['id' => $art['id']], $art);
        }

        // 4. Seed Recruitment Jobs
        $jobs = [
            [
                'id' => 1,
                'title' => ['vi' => 'Nhân Viên Kinh Doanh - Mảng Nguyên Liệu Mỹ Phẩm & Thực Phẩm', 'en' => 'Sales Executive - Cosmetic & Food Ingredients'],
                'department' => ['vi' => 'Phòng Kinh Doanh (Sales)', 'en' => 'Sales Department'],
                'location' => ['vi' => 'TP. Hồ Chí Minh', 'en' => 'Ho Chi Minh City'],
                'salary' => ['vi' => 'Thỏa thuận (Lương cứng + Hoa hồng)', 'en' => 'Negotiable (Base salary + Commission)'],
                'deadline' => '2026-07-15',
                'summary' => [
                    'vi' => 'Tìm kiếm đối tác khách hàng, phân phối các dòng nguyên liệu chất tạo màu, vitamin B3, B5, hương liệu nhập khẩu cho các cơ sở sản xuất chế biến thực phẩm và nhà máy gia công mỹ phẩm.',
                    'en' => 'Acquire B2B clients and distribute imported food colorings, food flavorings, stabilizers, and cosmetic ingredients (Niacinamide, B5, Tranexamic Acid) to manufacturing plants.'
                ],
                'responsibilities' => [
                    'vi' => [
                        'Tìm kiếm, khai thác khách hàng và đối tác sản xuất có nhu cầu về nguyên liệu thực phẩm và mỹ phẩm.',
                        'Tiếp cận và tư vấn kỹ thuật sản phẩm, báo giá, đàm phán hợp đồng cung ứng.',
                        'Chăm sóc và duy trì mối quan tế tốt đẹp lâu dài với khách hàng hiện hữu.',
                        'Phối hợp với bộ phận kỹ thuật R&D để giải quyết các vướng mắc ứng dụng của khách hàng.'
                    ],
                    'en' => [
                        'Identify and acquire manufacturing clients in need of food ingredients and cosmetic raw materials.',
                        'Approach clients, provide technical consulting, issue quotations, and negotiate supply agreements.',
                        'Maintain long-term fruitful relationships with existing customers.',
                        'Coordinate with the R&D technical team to resolve clients\' application challenges.'
                    ]
                ],
                'requirements' => [
                    'vi' => [
                        'Tốt nghiệp Cao đẳng/Đại học ngành Hóa học, Công nghệ thực phẩm, Công nghệ sinh học hoặc Quản trị kinh doanh.',
                        'Có tối thiểu 1 năm kinh nghiệm kinh doanh B2B nguyên liệu thực phẩm, nguyên liệu hóa mỹ phẩm hoặc các ngành liên quan.',
                        'Khả năng giao tiếp tốt, tự tin thuyết phục và đàm phán thương mại.',
                        'Chủ động trong công việc, có tinh thần cầu tiến.'
                    ],
                    'en' => [
                        'College or University degree in Chemistry, Food Technology, Biotechnology, or Business Administration.',
                        'At least 1 year of B2B sales experience in food ingredients, cosmetic materials, or related chemical sectors.',
                        'Strong communication, persuasion, and commercial negotiation skills.',
                        'Proactive in task execution and self-driven.'
                    ]
                ],
                'benefits' => [
                    'vi' => [
                        'Thu nhập hấp dẫn: Lương cơ bản cạnh tranh + Hoa hồng doanh số vượt trội.',
                        'Được đào tạo bài bản về kiến thức kỹ thuật sản phẩm nguyên liệu từ các chuyên gia.',
                        'Thưởng quý, thưởng năm theo kết quả kinh doanh và chính sách công ty.',
                        'Hưởng đầy đủ bảo hiểm xã hội, y tế theo quy định pháp luật.'
                    ],
                    'en' => [
                        'Attractive income: Competitive base salary + outstanding sales commissions.',
                        'Receive structured technical product training from experienced experts.',
                        'Quarterly and annual bonuses based on performance and company policy.',
                        'Full social and health insurance coverage according to local labor laws.'
                    ]
                ]
            ],
            [
                'id' => 2,
                'title' => ['vi' => 'Chuyên Viên Nghiên Cứu Phát Triển Sản Phẩm (R&D)', 'en' => 'Research & Development Specialist (R&D)'],
                'department' => ['vi' => 'Phòng R&D', 'en' => 'R&D Department'],
                'location' => ['vi' => 'TP. Hồ Chí Minh', 'en' => 'Ho Chi Minh City'],
                'salary' => ['vi' => 'Cạnh tranh', 'en' => 'Competitive'],
                'deadline' => '2026-07-30',
                'summary' => [
                    'vi' => 'Hỗ trợ kỹ thuật ứng dụng nguyên liệu khó tan, nhũ tương và chất ổn định làm dày cho hệ đồ uống và thực phẩm của các đối tác sản xuất.',
                    'en' => 'Provide technical support on raw materials, emulsions, and thickening stabilizers for beverage and food manufacturing partners.'
                ],
                'responsibilities' => [
                    'vi' => [
                        'Nghiên cứu ứng dụng và cải tiến công thức sản phẩm sử dụng nguyên liệu của công ty.',
                        'Hỗ trợ kỹ thuật thực nghiệm công thức tại phòng thí nghiệm của công ty và chuyển giao cho nhà máy của khách hàng.',
                        'Đánh giá cảm quan, kiểm tra độ ổn định của mẫu thử nghiệm.',
                        'Viết tài liệu hướng dẫn kỹ thuật ứng dụng sản phẩm.'
                    ],
                    'en' => [
                        'Formulate and improve products incorporating the company\'s stabilizers, emulsions, and colorings.',
                        'Conduct formulation lab trials and assist with technical transfer to client factories.',
                        'Perform sensory evaluations and shelf-life stability tests on trial samples.',
                        'Write application guides and technical data sheets.'
                    ]
                ],
                'requirements' => [
                    'vi' => [
                        'Tốt nghiệp Đại học chuyên ngành Công nghệ thực phẩm, Hóa học thực phẩm, Công nghệ sinh học.',
                        'Có ít nhất 2 năm kinh nghiệm làm R&D trong các công ty chế biến sữa, nước giải khát, nước sốt hoặc phụ gia thực phẩm.',
                        'Có hiểu biết tốt về chất làm đầy, gum ổn định và hoạt động nhũ hóa.',
                        'Kỹ năng làm việc độc lập và quản lý dự án thí nghiệm tốt.'
                    ],
                    'en' => [
                        'University degree in Food Technology, Food Chemistry, or Biotechnology.',
                        'At least 2 years of R&D experience in dairy, beverages, sauces, or food additives companies.',
                        'Good understanding of hydrocolloids, stabilizing gums, and emulsification.',
                        'Strong capability to work independently and manage experimental projects.'
                    ]
                ],
                'benefits' => [
                    'vi' => [
                        'Lương cứng cạnh tranh theo năng lực chuyên môn.',
                        'Cơ hội làm việc trực tiếp với các dây chuyền và chuyên gia siêu phân tử tiên tiến.',
                        'Môi trường phòng lab hiện đại, tiện nghi.',
                        'Tham gia các khóa đào tạo chuyên sâu trong nước và quốc tế.'
                    ],
                    'en' => [
                        'Competitive base salary tailored to expertise.',
                        'Direct opportunities to work with advanced molecular expert systems.',
                        'Modern, fully equipped laboratory environment.',
                        'Professional training courses, locally and internationally.'
                    ]
                ]
            ],
        ];

        foreach ($jobs as $job) {
            RecruitmentJob::updateOrCreate(['id' => $job['id']], $job);
        }

        // 5. Seed Contact Leads
        Lead::create([
            'name' => 'Nguyễn Văn A',
            'email' => 'nguyenvana@gmail.com',
            'phone' => '0912345678',
            'message' => 'Tôi cần yêu cầu báo giá nguyên liệu bột Beta-carotene 10% cho dự án nước trái cây sắp tới.',
            'status' => 'pending',
        ]);
        Lead::create([
            'name' => 'Trần Thị B',
            'email' => 'tranthib@cosmetics.vn',
            'phone' => '0987654321',
            'message' => 'Xin gửi cho tôi tài liệu thông số kỹ thuật (COA) và mẫu thử của hoạt chất Niacinamide 99%.',
            'status' => 'processed',
        ]);

        $this->call(CmsSeeder::class);
    }
}

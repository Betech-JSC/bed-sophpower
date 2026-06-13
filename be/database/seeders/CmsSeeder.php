<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\Banner;
use App\Models\Faq;
use App\Models\Setting;
use App\Models\SeoRedirect;
use App\Models\ProductQuestion;
use Illuminate\Database\Seeder;

class CmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Static Pages
        $pages = [
            [
                'slug' => 'quality-standards',
                'title' => [
                    'vi' => 'Chính Sách Chất Lượng & Kiểm Soát Nguyên Liệu',
                    'en' => 'Quality Policy & Raw Material Control',
                ],
                'content' => [
                    'vi' => "Sophpower Việt Nam cam kết cung cấp các dòng sản phẩm nguyên liệu thực phẩm và mỹ phẩm đáp ứng đầy đủ các tiêu chuẩn chất lượng đã cam kết với khách hàng. Toàn bộ các sản phẩm nhập khẩu đều có nguồn gốc xuất xứ rõ ràng và được sản xuất bởi các nhà máy đạt tiêu chuẩn quản lý chất lượng quốc tế.\n\nMỗi lô hàng nhập khẩu đều được kiểm tra hồ sơ chất lượng nghiêm ngặt trước khi thông quan, bao gồm chứng nhận phân tích sản phẩm (COA) từ nhà sản xuất, phiếu an toàn hóa chất (MSDS) và chứng nhận lưu hành tự do (CFS) từ cơ quan có thẩm quyền nước xuất khẩu.\n\nQuy trình lấy mẫu thử nghiệm được thực hiện độc lập trước khi giao hàng cho khách hàng để đảm bảo các chỉ tiêu hóa lý, vi sinh và hàm lượng kim loại nặng nằm trong giới hạn cho phép. Trong trường hợp xảy ra sai lệch về chất lượng so với tiêu chuẩn công bố, Sophpower chịu trách nhiệm thu hồi và đổi mới sản phẩm cho đối tác trong thời gian ngắn nhất.",
                    'en' => "Sophpower Vietnam is committed to providing food and cosmetic ingredient products that fully meet the quality standards committed to our customers. All imported products have clear origins and are manufactured by factories meeting international quality management standards.\n\nEach imported shipment undergoes strict quality document inspection before customs clearance, including Certificate of Analysis (COA) from the manufacturer, Material Safety Data Sheets (MSDS), and Certificate of Free Sale (CFS) from the competent authorities of the exporting country.\n\nIndependent sample testing is performed before delivery to customers to ensure that physical, chemical, microbiological indicators, and heavy metal content are within permissible limits. In case of any quality deviations from published standards, Sophpower is responsible for recalling and replacing products for partners in the shortest time.",
                ],
            ],
            [
                'slug' => 'privacy-policy',
                'title' => [
                    'vi' => 'Chính Sách Bảo Mật Thông Tin Đối Tác & Khách Hàng',
                    'en' => 'Partner & Customer Information Privacy Policy',
                ],
                'content' => [
                    'vi' => "Chúng tôi coi trọng việc bảo vệ dữ liệu cá nhân và thông tin thương mại của tất cả đối tác. Mọi thông tin thu thập trong quá trình giao dịch, ký kết hợp đồng và gửi mẫu thử nghiệm đều được bảo mật tuyệt đối.\n\nThông tin chi tiết về công thức ứng dụng sản phẩm, quy trình công nghệ chuyển giao từ đội ngũ R&D của Sophpower đến phòng lab của khách hàng được phân loại là thông tin mật và chỉ sử dụng nội bộ nhằm mục đích phát triển sản phẩm của riêng khách hàng đó.\n\nChúng tôi cam kết không chia sẻ thông tin giao dịch, dữ liệu mua hàng hoặc danh tính khách hàng cho bất kỳ bên thứ ba nào khi chưa có sự đồng ý bằng văn bản của người đại diện có thẩm quyền từ phía đối tác.",
                    'en' => "We value the protection of personal data and commercial information of all partners. All information collected during transactions, contract signings, and sample submissions is kept strictly confidential.\n\nDetailed information regarding product application formulas and technology transfer processes from Sophpower's R&D team to the customer's laboratory is classified as confidential and is used solely for the customer's own product development purposes.\n\nWe commit not to share transaction details, purchase data, or customer identities with any third party without prior written consent from the authorized representative of the partner.",
                ],
            ],
            [
                'slug' => 'cooperation-terms',
                'title' => [
                    'vi' => 'Điều Khoản Hợp Tác & Giao Dịch Cung Ứng',
                    'en' => 'Cooperation & Supply Transaction Terms',
                ],
                'content' => [
                    'vi' => "Mối quan hệ giao dịch thương mại giữa Sophpower và khách hàng được điều chỉnh bởi các điều khoản quy định chi tiết trong Hợp đồng mua bán. Khách hàng thực hiện thanh toán tiền mua hàng theo đúng kỳ hạn và phương thức thỏa thuận.\n\nVề giao nhận hàng hóa, hàng được bàn giao tại địa chỉ kho của khách hàng kèm đầy đủ hóa đơn giá trị gia tăng, phiếu giao hàng và COA tương ứng của lô hàng. Khách hàng có trách nhiệm kiểm tra số lượng và tình trạng bao bì trực tiếp khi nhận hàng.\n\nMọi khiếu nại về số lượng hoặc lỗi bao bì rách hỏng phát sinh trong quá trình vận chuyển cần được phản hồi ngay lập tức cho nhân viên giao nhận và lập biên bản ghi nhận tại chỗ để làm căn cứ xử lý đổi trả hoặc bù hàng.",
                    'en' => "The commercial transaction relationship between Sophpower and the customer is governed by the terms specified in the Purchase Agreement. Customers shall make payments for purchases in accordance with the agreed terms and methods.\n\nRegarding product delivery, goods are handed over at the customer's warehouse address along with full value-added invoices, delivery notes, and the corresponding COA of the batch. Customers are responsible for inspecting the quantity and packaging condition directly upon receipt.\n\nAny complaints regarding quantities or damaged packaging during transport must be immediately reported to the delivery staff and recorded on-site as a basis for return or replenishment.",
                ],
            ],
        ];

        foreach ($pages as $p) {
            Page::updateOrCreate(['slug' => $p['slug']], $p);
        }

        // 2. Seed Banners
        $banners = [
            [
                'title' => [
                    'vi' => 'Sophpower Vietnam',
                    'en' => 'Sophpower Vietnam',
                ],
                'desc' => [
                    'vi' => 'Nguồn cung cấp nguyên liệu thực phẩm và mỹ phẩm chất lượng hàng đầu.',
                    'en' => 'A leading supplier of high-quality food and cosmetic ingredients.',
                ],
                'image' => '/images/banner1.jpg',
                'link' => '/nguyen-lieu-thuc-pham',
                'order' => 0,
                'is_active' => true,
            ],
            [
                'title' => [
                    'vi' => 'Giải pháp tối ưu',
                    'en' => 'Optimal Solutions',
                ],
                'desc' => [
                    'vi' => 'Đồng hành và hỗ trợ sự phát triển bền vững của doanh nghiệp bạn.',
                    'en' => 'Accompanying and supporting the sustainable development of your business.',
                ],
                'image' => '/images/banner2.jpg',
                'link' => '/nguyen-lieu-my-pham',
                'order' => 1,
                'is_active' => true,
            ],
        ];

        foreach ($banners as $b) {
            Banner::create($b);
        }

        // 3. Seed FAQs
        $faqs = [
            [
                'question' => [
                    'vi' => 'Làm thế nào để yêu cầu nhận mẫu thử nguyên liệu?',
                    'en' => 'How can I request raw material samples?',
                ],
                'answer' => [
                    'vi' => 'Bạn có thể điền vào biểu mẫu liên hệ ở trang Liên hệ hoặc gửi câu hỏi trực tiếp trong trang chi tiết sản phẩm. Đội ngũ R&D của chúng tôi sẽ liên hệ lại để xác nhận và gửi mẫu thử miễn phí đến phòng lab của bạn.',
                    'en' => 'You can fill out the contact form on the Contact page or send a question directly on the product detail page. Our R&D team will contact you to confirm and ship free samples to your laboratory.',
                ],
                'category' => [
                    'vi' => 'Mẫu thử',
                    'en' => 'Samples',
                ],
                'order' => 0,
            ],
            [
                'question' => [
                    'vi' => 'Sophpower cung cấp các chứng nhận chất lượng nào?',
                    'en' => 'What quality certifications does Sophpower provide?',
                ],
                'answer' => [
                    'vi' => 'Tất cả nguyên liệu của chúng tôi đều đi kèm đầy đủ COA, MSDS. Nhiều sản phẩm đạt tiêu chuẩn ISO, HACCP, Halal và Kosher tùy theo yêu cầu của đối tác.',
                    'en' => 'All our raw materials come with full COA and MSDS. Many products meet ISO, HACCP, Halal, and Kosher standards depending on the partner\'s requirements.',
                ],
                'category' => [
                    'vi' => 'Chứng nhận',
                    'en' => 'Certifications',
                ],
                'order' => 1,
            ],
        ];

        foreach ($faqs as $f) {
            Faq::create($f);
        }

        // 4. Seed Settings
        $settings = [
            'smtp_host' => 'smtp.mailtrap.io',
            'smtp_port' => '2525',
            'smtp_username' => 'user123',
            'smtp_password' => 'pass123',
            'smtp_encryption' => 'tls',
            'smtp_from_address' => 'noreply@sophpower.com',
            'smtp_from_name' => 'Sophpower Vietnam',

            'meta_title_vi' => 'Sophpower Vietnam - Nguyên liệu Thực phẩm & Mỹ phẩm chất lượng cao',
            'meta_title_en' => 'Sophpower Vietnam - Premium Food & Cosmetic Ingredients',
            'meta_desc_vi' => 'Sophpower Việt Nam chuyên cung cấp các dòng nguyên liệu thực phẩm và mỹ phẩm đạt tiêu chuẩn chất lượng quốc tế.',
            'meta_desc_en' => 'Sophpower Vietnam specializes in providing food and cosmetic ingredients meeting international quality standards.',
            'meta_keywords_vi' => 'phụ gia thực phẩm, nguyên liệu mỹ phẩm, Beta-carotene, Carmine, Niacinamide',
            'meta_keywords_en' => 'food additives, cosmetic ingredients, Beta-carotene, Carmine, Niacinamide',

            'contact_phone' => '+84 28 3824 0000',
            'contact_email' => 'info@sophpower.com',
            'contact_address_vi' => 'Tòa nhà Sophpower, Quận 1, TP. Hồ Chí Minh',
            'contact_address_en' => 'Sophpower Building, District 1, Ho Chi Minh City',

            'header_scripts' => '<!-- Google Analytics -->',
            'footer_scripts' => '<!-- Live Chat Widget -->',
        ];

        foreach ($settings as $k => $v) {
            Setting::setVal($k, $v);
        }

        // 5. Seed SEO Redirects
        $redirects = [
            [
                'source_url' => '/list_2',
                'target_url' => '/nguyen-lieu-thuc-pham',
                'http_code' => 301,
            ],
            [
                'source_url' => '/list_3',
                'target_url' => '/nguyen-lieu-my-pham',
                'http_code' => 301,
            ],
        ];

        foreach ($redirects as $r) {
            SeoRedirect::updateOrCreate(['source_url' => $r['source_url']], $r);
        }

        // 6. Seed Product Question
        ProductQuestion::create([
            'product_id' => 16, // Bột Beta-carotene
            'customer_name' => 'Lê Văn C',
            'customer_email' => 'levanc@dairyvietnam.vn',
            'customer_phone' => '0901234567',
            'question' => 'Bột Beta-carotene này có hòa tan hoàn toàn trong nước lạnh không?',
            'answer' => 'Có, sản phẩm có thể phân tán hoàn toàn trong nước lạnh ở nhiệt độ thường.',
            'status' => 'replied',
        ]);
    }
}

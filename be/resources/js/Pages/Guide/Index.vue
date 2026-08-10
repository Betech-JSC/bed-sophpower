<template>
  <CrmLayout title="Hướng dẫn sử dụng CMS & Website">
    <div class="space-y-8 max-w-5xl mx-auto pb-12">
      <!-- Welcome Header -->
      <div class="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white rounded-2xl p-8 shadow-md relative overflow-hidden">
        <div class="relative z-10 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest bg-emerald-700/50 px-3 py-1 rounded-full border border-emerald-500/30">
            Tài liệu quản trị viên
          </span>
          <h1 class="text-3xl font-extrabold tracking-tight">HƯỚNG DẪN SỬ DỤNG HỆ THỐNG</h1>
          <p class="text-emerald-100 text-sm max-w-2xl leading-relaxed">
            Chào mừng bạn đến với trang tài liệu hướng dẫn quản trị website SOPHPOWER. 
            Dưới đây là thông tin chi tiết và hướng dẫn vận hành cho từng phân hệ chức năng trên hệ thống CMS.
          </p>
        </div>
        <!-- Abstract background pattern -->
        <div class="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none">
          <svg class="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <polygon points="50,0 100,0 100,100 0,100" />
          </svg>
        </div>
      </div>

      <!-- Quick Navigation Tabs -->
      <div class="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <button 
          v-for="(tab, idx) in tabs" 
          :key="idx"
          @click="activeTab = idx"
          :class="[
            activeTab === idx 
              ? 'bg-emerald-700 text-white font-semibold shadow-sm' 
              : 'bg-white text-gray-650 hover:bg-gray-50 border border-gray-200',
            'px-4 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Content Area -->
      <div class="bg-white rounded-xl border border-gray-150 shadow-xs p-8">
        
        <!-- Phân hệ Nội Dung -->
        <div v-if="activeTab === 0" class="space-y-8 animate-fade-in">
          <div>
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <span class="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
              1. Quản lý Danh mục & Sản phẩm
            </h2>
            <p class="text-gray-500 text-sm mb-4">
              Hướng dẫn cấu hình hệ thống cây danh mục đa cấp động và quản lý kho nguyên liệu thực phẩm, mỹ phẩm.
            </p>

            <div class="space-y-4">
              <!-- Sub-section: Quản lý Danh mục -->
              <div class="bg-emerald-50/60 rounded-xl p-5 border border-emerald-100 space-y-3 text-sm text-gray-700">
                <div class="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <span>🌐</span> A. Hướng dẫn Tạo & Quản lý Cây Danh mục (Cấp 1, Cấp 2, Cấp 3)
                </div>
                <ul class="list-disc pl-5 space-y-2.5 leading-relaxed text-gray-650">
                  <li>
                    <strong>Danh mục Gốc Cấp 1 (Menu Header):</strong> 
                    Mỗi Danh mục Gốc Cấp 1 được tạo sẽ tự động xuất hiện làm nút <strong>Menu chính trên thanh Header Website</strong> (VD: <em>NGUYÊN LIỆU THỰC PHẨM</em>, <em>NGUYÊN LIỆU MỸ PHẨM</em>, <em>CHIẾT XUẤT THỰC VẬT</em>). Đồng thời hệ thống tự sinh một trang giao diện riêng trên website tương ứng với đường dẫn slug (VD: <code class="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded text-xs font-mono">/chiet-xuat-thuc-vat</code>).
                  </li>
                  <li>
                    <strong>Thêm & Quản lý Danh mục Con (Cấp 2 & Cấp 3):</strong>
                    Tại màn hình <em>Quản lý danh mục</em>, nhấp vào nút <span class="bg-emerald-700 text-white px-2 py-0.5 rounded text-xs font-bold">📂 Quản lý & Thêm danh mục con</span> ở từng dòng danh mục gốc.
                    <ul class="list-circle pl-5 mt-1.5 space-y-1 text-xs text-gray-600">
                      <li>• <strong>Danh mục Cấp 2:</strong> Là các nhóm chính thuộc danh mục gốc (VD: <em>Phụ gia</em>, <em>Bột trái cây</em>, <em>Hương liệu</em>). Hiển thị dạng Menu sổ xuống (Dropdown Menu) trên thanh Header và làm các tab lọc nhanh trên trang sản phẩm.</li>
                      <li>• <strong>Danh mục Cấp 3:</strong> Là các nhóm chi tiết nằm bên trong danh mục Cấp 2 (VD: <em>Chất làm dày</em>, <em>Chất ổn định</em> nằm bên trong nhóm <em>Phụ gia</em>).</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Thêm nhanh hàng loạt (Bulk Insert):</strong> Trong cửa sổ popup quản lý danh mục con, nhấp nút <strong>"Thêm danh mục Cấp 2"</strong> hoặc <strong>"Thêm danh mục Cấp 3"</strong> để mở công cụ nhập nhanh nhiều danh mục liên tiếp cùng lúc.
                  </li>
                  <li>
                    <strong>Thứ tự hiển thị (Sort Order):</strong> Nhập số thứ tự tại cột <em>"Thứ tự (Header)"</em> để sắp xếp vị trí xuất hiện của các nút menu trên thanh Header website từ trái qua phải.
                  </li>
                </ul>
              </div>

              <!-- Sub-section: Quản lý Sản phẩm -->
              <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3 text-sm text-gray-650">
                <div class="flex items-center gap-2 text-gray-900 font-bold text-base">
                  <span>📦</span> B. Hướng dẫn Quản lý & Gắn Sản phẩm
                </div>
                <ul class="list-disc pl-5 space-y-2 leading-relaxed">
                  <li><strong>Gắn Danh mục cho Sản phẩm:</strong> Khi thêm hoặc sửa sản phẩm, chọn danh mục phù hợp trong ô <em>"Danh mục sản phẩm *"</em>. Hệ thống hiển thị dạng cây phân cấp thụt lề trực quan (<code class="bg-gray-200 px-1 rounded">📁 Gốc ➔ 📂 Cấp 2 ➔ 📄 Cấp 3</code>) giúp gán chính xác sản phẩm vào phân loại mong muốn.</li>
                  <li><strong>Hỗ trợ đa ngôn ngữ:</strong> Mỗi sản phẩm cho phép nhập tên, mô tả, quy cách đóng gói và thông số kỹ thuật riêng biệt cho cả tiếng Việt (VI) và tiếng Anh (EN).</li>
                  <li><strong>Custom URL Slug:</strong> Cho phép nhập slug tùy chỉnh cho đường dẫn (VD: <code class="bg-gray-200 px-1 rounded text-emerald-700">tinh-chat-tra-xanh</code>). Nếu bỏ trống, hệ thống sẽ tự sinh slug duy nhất từ tên tiếng Việt.</li>
                  <li><strong>Thông số kỹ thuật & Ứng dụng:</strong> Thêm bớt các thông số và ứng dụng động bằng công cụ nhập liệu trực quan dạng danh sách.</li>
                  <li><strong>Lọc sản phẩm thông minh:</strong> Màn hình quản lý sản phẩm có ô chọn lọc động theo cây danh mục phân cấp giúp tìm kiếm nguyên liệu nhanh chóng.</li>
                </ul>
              </div>
            </div>
          </div>

          <hr class="border-gray-100" />

          <div>
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <span class="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
              2. Quản lý Tin tức & Bài viết
            </h2>
            <p class="text-gray-500 text-sm mb-4">
              Hệ thống quản lý bài viết thuộc chuyên mục tin tức, khoa học hoặc xu hướng thị trường.
            </p>
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 text-sm text-gray-650">
              <p><strong>Tính năng cốt lõi:</strong></p>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Danh mục bài viết:</strong> Nhóm bài viết theo các chủ đề như: <em>Tin tức Sophpower</em>, <em>Kiến thức khoa học</em>, <em>Xu hướng thị trường</em>.</li>
                <li><strong>Trình soạn thảo Quill Editor:</strong> Hỗ trợ định dạng văn bản nâng cao, chèn hình ảnh trực tiếp từ máy tính hoặc từ thư viện file của hệ thống.</li>
                <li><strong>Quản lý Ảnh đại diện:</strong> Upload trực tiếp file ảnh đại diện bài viết hoặc chọn ảnh có sẵn từ thư viện media.</li>
                <li><strong>Chia sẻ Mạng xã hội:</strong> Storefront được tích hợp sẵn các nút chia sẻ mạng xã hội (Facebook, LinkedIn, Twitter, Sao chép link) tại trang chi tiết bài viết để tăng khả năng tiếp cận người dùng.</li>
                <li><strong>Custom Slug:</strong> Tùy chỉnh đường dẫn thân thiện SEO cho bài viết tương tự như module sản phẩm.</li>
              </ul>
            </div>
          </div>

          <hr class="border-gray-100" />

          <div>
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <span class="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
              3. Quản lý Tuyển dụng
            </h2>
            <p class="text-gray-500 text-sm mb-4">
              Đăng tải các cơ hội nghề nghiệp tại Sophpower nhằm chiêu mộ nhân tài.
            </p>
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 text-sm text-gray-650">
              <p><strong>Tính năng cốt lõi:</strong></p>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Thông tin cơ bản:</strong> Tiêu đề công việc, Phòng ban tuyển dụng, Địa điểm làm việc, Mức lương và Hạn nộp hồ sơ.</li>
                <li><strong>Mô tả chi tiết:</strong> Chia nhỏ các phần Yêu cầu công việc, Trách nhiệm chính, và Chế độ phúc lợi thành các dòng mục tiêu động trực quan.</li>
                <li><strong>Custom Slug & SEO:</strong> Hỗ trợ sinh slug tự động hoặc tùy chỉnh riêng cho trang tuyển dụng.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Phân hệ Tương Tác & Phản Hồi -->
        <div v-if="activeTab === 1" class="space-y-8 animate-fade-in">
          <div>
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <span class="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
              1. Yêu cầu liên hệ (Leads)
            </h2>
            <p class="text-gray-500 text-sm mb-4">
              Nơi nhận và xử lý các thông tin liên hệ từ khách hàng gửi qua form trên website storefront.
            </p>
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 text-sm text-gray-650">
              <p><strong>Quy trình xử lý:</strong></p>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Khi khách hàng gửi yêu cầu, một bản ghi mới có trạng thái <span class="bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded font-bold border border-red-100">Chờ xử lý</span> sẽ xuất hiện trong danh sách.</li>
                <li>Nhân viên quản trị liên hệ với khách hàng qua số điện thoại hoặc email được cung cấp để tư vấn kỹ thuật/báo giá.</li>
                <li>Sau khi hoàn tất liên hệ, click nút <strong>"Đã xử lý"</strong> để cập nhật trạng thái của Lead. Hành động này giúp thống kê chính xác hiệu suất xử lý trên Dashboard chính.</li>
              </ol>
            </div>
          </div>

          <hr class="border-gray-100" />

          <div>
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <span class="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
              2. Hỏi đáp Sản phẩm & FAQs
            </h2>
            <p class="text-gray-500 text-sm mb-4">
              Hệ thống trả lời thắc mắc trực tuyến và quản lý câu hỏi thường gặp.
            </p>
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 text-sm text-gray-650">
              <p><strong>Quy trình duyệt câu hỏi sản phẩm:</strong></p>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Cơ chế bảo mật:</strong> Để tránh spam, mọi câu hỏi do người dùng gửi ở trang chi tiết sản phẩm sẽ ở trạng thái ẩn và chỉ hiển thị ở CMS Admin.</li>
                <li><strong>Trả lời câu hỏi:</strong> Quản trị viên nhập phản hồi trực tiếp cho câu hỏi đó. Trạng thái tự động đổi thành <span class="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded font-bold border border-emerald-100">Đã phản hồi</span> và câu hỏi + câu trả lời sẽ xuất hiện công khai trên trang chi tiết sản phẩm của storefront.</li>
                <li><strong>Hỏi đáp FAQs chung:</strong> Tạo các câu hỏi thường gặp tĩnh (VD: Chính sách giao hàng, Cam kết chất lượng,...) hiển thị tập trung tại trang FAQs của website.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Phân hệ SEO & Hệ Thống -->
        <div v-if="activeTab === 2" class="space-y-8 animate-fade-in">
          <div>
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <span class="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
              1. Thư viện File (Media Manager)
            </h2>
            <p class="text-gray-500 text-sm mb-4">
              Nơi lưu trữ tập trung hình ảnh và tài liệu tải lên hệ thống.
            </p>
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 text-sm text-gray-650">
              <p><strong>Tính năng và Cách sử dụng:</strong></p>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Tải lên tập tin:</strong> Hỗ trợ tải lên hình ảnh định dạng phổ biến (JPG, PNG, WEBP) với giới hạn kích thước tối đa 2MB mỗi file để tối ưu tốc độ tải trang.</li>
                <li><strong>Sao chép liên kết:</strong> Tại giao diện quản lý File, quản trị viên có thể click vào nút <strong>"Sao chép link"</strong> của bất kỳ ảnh nào để lấy đường dẫn tuyệt đối dạng <code class="bg-gray-200 px-1 rounded text-gray-700">/storage/media/filename.jpg</code> và dán vào nội dung bài viết.</li>
                <li><strong>Tích hợp trực tiếp:</strong> Khi chỉnh sửa sản phẩm hoặc bài viết, quản trị viên có thể mở thư viện và chọn trực tiếp file ảnh có sẵn thay vì phải tải lại từ máy tính.</li>
              </ul>
            </div>
          </div>

          <hr class="border-gray-100" />

          <div>
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <span class="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
              2. Quản lý SEO Redirects (301)
            </h2>
            <p class="text-gray-500 text-sm mb-4">
              Công cụ cấu hình chuyển hướng liên kết, cực kỳ quan trọng khi tái cấu trúc website.
            </p>
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 text-sm text-gray-650">
              <p><strong>Cách hoạt động:</strong></p>
              <ul class="list-disc pl-5 space-y-2">
                <li>Nếu bạn thay đổi slug của một sản phẩm hoặc bài viết (VD: từ <code class="bg-gray-200 px-1 rounded">old-slug</code> sang <code class="bg-gray-200 px-1 rounded">new-slug</code>), link cũ trên Google Search sẽ bị lỗi 404 (Không tìm thấy trang).</li>
                <li>Để khắc phục, hãy vào phần <strong>SEO Redirects</strong> và tạo một bản ghi: Đường dẫn cũ = <code class="bg-gray-200 px-1 rounded">/news/old-slug</code>, Đường dẫn mới = <code class="bg-gray-200 px-1 rounded">/news/new-slug</code>.</li>
                <li>Hệ thống sẽ tự động chuyển hướng người dùng và bot tìm kiếm sang đường dẫn mới với mã trạng thái HTTP 301, giữ nguyên giá trị SEO tích lũy của trang web.</li>
              </ul>
            </div>
          </div>

          <hr class="border-gray-100" />

          <div>
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <span class="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
              3. Quản lý nhãn dịch (Translations)
            </h2>
            <p class="text-gray-500 text-sm mb-4">
              Bản dịch cho các chuỗi ký tự tĩnh trên website.
            </p>
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 text-sm text-gray-650">
              <p><strong>Hướng dẫn chỉnh sửa nhãn:</strong></p>
              <ul class="list-disc pl-5 space-y-2">
                <li>Hệ thống tự động lọc và đồng bộ các từ khóa tĩnh trên giao diện storefront (VD: "Liên hệ ngay", "Xem thêm", "Hạn nộp hồ sơ",...).</li>
                <li>Quản trị viên có thể tìm kiếm từ khóa cần đổi và chỉnh sửa giá trị hiển thị tiếng Việt và tiếng Anh mà không cần chỉnh sửa mã nguồn của lập trình viên.</li>
              </ul>
            </div>
          </div>

          <hr class="border-gray-100" />

          <div>
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <span class="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
              4. Cấu hình chung & Trang tĩnh
            </h2>
            <p class="text-gray-500 text-sm mb-4">
              Cài đặt các thông số kỹ thuật SEO toàn trang và nội dung các trang thông tin tĩnh.
            </p>
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 text-sm text-gray-650">
              <p><strong>Cấu hình chung (Settings):</strong></p>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Thông tin chân trang (Footer):</strong> Chỉnh sửa địa chỉ văn phòng, số điện thoại hotline, email hỗ trợ kỹ thuật hiển thị ở chân trang website công cộng.</li>
                <li><strong>Script mã tích hợp:</strong> Chèn mã theo dõi Google Analytics, Facebook Pixel, Google Tag Manager trực tiếp vào thẻ Header hoặc Footer của website.</li>
                <li><strong>SEO Robots & Meta:</strong> Định cấu hình chỉ thị bot tìm kiếm (robots.txt, thẻ meta robots) để cho phép hoặc chặn lập chỉ mục một số trang nhất định.</li>
              </ul>
              <p class="mt-4"><strong>Trang tĩnh (Static Pages):</strong></p>
              <ul class="list-disc pl-5 space-y-2">
                <li>Chỉnh sửa trực tiếp nội dung các trang: <em>Về chúng tôi</em>, <em>Chính sách bảo mật</em>, <em>Điều khoản sử dụng</em>. Nội dung được trình bày dạng văn bản phong phú thông qua trình soạn thảo HTML của CMS.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      
      <!-- Footer Note -->
      <div class="text-center text-xs text-gray-400">
        Bản quyền thuộc về SOPHPOWER © 2026. Nếu gặp sự cố kỹ thuật hoặc cần nâng cấp tính năng, vui lòng liên hệ bộ phận phát triển hệ thống.
      </div>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { label: 'Phân hệ Nội dung' },
  { label: 'Tương tác & Phản hồi' },
  { label: 'SEO & Hệ thống' }
];
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

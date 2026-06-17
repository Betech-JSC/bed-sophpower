# TỔNG QUAN DỰ ÁN REDESIGN & VIỆT HÓA WEBSITE SOPHPOWER

Tài liệu này cung cấp mô tả chi tiết về dự án nâng cấp giao diện, cấu trúc thông tin và Việt hóa website **Sophchem** cho **Công ty TNHH Công nghiệp Sophpower Việt Nam**, được thực hiện bởi đối tác dịch vụ giải pháp số **Betech**.

---

## 🎯 Mục tiêu Dự án
- **Việt hóa toàn diện**: Chuyển đổi toàn bộ nội dung, bài viết tin tức và thông số sản phẩm sang tiếng Việt chuẩn hóa, chuyên nghiệp.
- **Redesign giao diện B2B tối giản**: Chuyển đổi phong cách thiết kế sang ngôn ngữ B2B chuyên nghiệp, sử dụng cấu trúc phẳng, bo góc cứng cáp (`rounded-xl`), giản lược các icon rườm rà, tập trung cao độ vào trải nghiệm đọc thông tin kỹ thuật của đối tác.
- **Nhất quán thương hiệu**: Đồng bộ hóa toàn bộ màu sắc chủ đạo sang tông màu xanh lá cây thương hiệu của Sophpower (`#106d38`) tại menu chính, thanh toolbar, hộp liên hệ và các điểm nhấn giao diện.
- **Tối ưu kỹ thuật**: Xây dựng trên nền tảng Next.js 16 (App Router) + Tailwind CSS v4, tối ưu hóa SEO onpage và khắc phục lỗi hiển thị font tiếng Việt.

---

## 💻 Tech Stack (Công nghệ sử dụng)
- **Framework**: Next.js 16.1.3 (React 19, App Router)
- **Styling**: Tailwind CSS v4 (cấu hình biến màu `@theme inline` hiện đại)
- **Typography (Font chữ)**: **Roboto** (Google Font, được cấu hình subsets `latin` và `vietnamese` khắc phục triệt để lỗi font chữ tiếng Việt, đồng thời sẵn sàng hỗ trợ đa ngôn ngữ tiếng Trung/Anh thông qua cơ chế fallback font hệ thống `PingFang SC` và `Microsoft YaHei`).
- **Icons**: Lucide React (được giản lược tối đa theo chuẩn B2B).
- **Phục vụ chạy thử (Preview)**: Máy chủ Node.js phát triển cục bộ (`npm run dev`).

---

## 🗺️ Sitemap & Các trang đã Triển khai

Website được cấu trúc theo đúng sitemap gốc và yêu cầu trong Phụ lục Hợp đồng:

1. **Trang chủ (`/`)**: 
   - Banner trượt (Hero slider) tối giản giới thiệu các mảng sản phẩm.
   - Lưới tab danh mục sản phẩm nổi bật phẳng (không dùng xanh dương đậm).
   - Khối giới thiệu thế mạnh công nghệ siêu phân tử của doanh nghiệp.
2. **Giới thiệu (`/about`)**:
   - Lịch sử doanh nghiệp, năng lực chuyên môn về hóa chất/thiết bị nguồn.
   - Các chứng nhận tiêu chuẩn quốc tế: ISO, HACCP, HALAL, Kosher, FDA.
3. **Nguyên liệu Thực phẩm (`/list_2`) & Nguyên liệu Mỹ phẩm (`/list_3`)**:
   - Danh sách lưới sản phẩm (Bột Beta-carotene, Carmine, Niacinamide, Panthenol, Ectoin, v.v.).
   - Trang chi tiết sản phẩm (`/list_2/[id]` & `/list_3/[id]`) trình bày chi tiết mô tả, thông số kỹ thuật, ứng dụng thực tế và quy cách đóng gói.
4. **Trung tâm Tin tức (`/news` & `/news/[id]`)**:
   - Layout dạng **Grid B2B** tối giản mới: bài viết mới nhất hiển thị lớn ở trên cùng (Featured), các bài tiếp theo xếp dạng lưới.
   - Tích hợp bộ lọc danh mục tin tức (Filter Tabs) trực tiếp.
   - 4 bài viết song ngữ Việt - Anh chính thức từ tài liệu của khách hàng.
5. **Liên hệ (`/contact`)**:
   - Hộp thông tin liên hệ nền xanh thương hiệu, bản đồ chỉ đường và Form gửi yêu cầu báo giá/mẫu thử.
6. **Tuyển dụng (`/recruitment` & `/recruitment/[id]`)**:
   - Danh sách các vị trí đang tuyển dụng (Kinh doanh nguyên liệu, Chuyên viên R&D).
7. **Tìm kiếm (`/search`)**:
   - Trang kết quả tìm kiếm sản phẩm và tin tức theo từ khóa.
8. **Admin Dashboard (`/admin`)**:
   - Dashboard quản lý danh mục sản phẩm, tin tức, tuyển dụng, form liên hệ của đối tác (Mock Client-Side).

---

## 🔬 Kết quả Kiểm định Chất lượng (Quality Audit)
Mã nguồn dự án đã vượt qua 100% các kiểm tra chất lượng từ bộ quét tự động `checklist.py`:
- **Security Check**: Đã thông qua, không chứa lỗ hổng bảo mật hay lộ thông tin nhạy cảm.
- **Lint & Type Check**: Biên dịch sạch sẽ, không có cảnh báo TypeScript hay ESLint.
- **UX Audit (Banned Colors)**: Tuyệt đối tuân thủ không sử dụng tông màu tím/violet trong thương hiệu chính. Đổi tên sản phẩm `Purple Pigment` sang `"Màu Tím Tự Nhiên"` (`mau-tim-tu-nhien.png`) để đảm bảo chất lượng.
- **SEO Check**: Cấu hình cấu trúc thẻ Layout tối ưu, đầy đủ thẻ tiêu đề và mô tả tiếng Việt chuẩn.

---

## 🚀 Hướng dẫn Khởi chạy
1. Truy cập thư mục dự án:
   ```bash
   cd web
   ```
2. Khởi chạy máy chủ phát triển:
   ```bash
   npm run dev
   ```
3. Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

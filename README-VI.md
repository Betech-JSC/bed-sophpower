# Dự Án Redesign & Việt Hóa Website Sophpower Việt Nam

Kho lưu trữ này chứa mã nguồn cho dự án clone, nâng cấp thiết kế (redesign) và Việt hóa website **Sophchem** (https://www.sophchem.com/) dành riêng cho **Công ty TNHH Công nghiệp Sophpower Việt Nam** (Pioneer Herb Industrial Co., Ltd.), được thực hiện bởi **Betech JSC**.

Dự án chuyển đổi cổng thông tin phức tạp ban đầu thành một trang web danh mục và giới thiệu sản phẩm B2B gọn gàng, phẳng và tối ưu hóa cao cho thị trường Việt Nam.

---

## 🎯 Mục tiêu Dự án

*   **Việt hóa toàn diện:** Toàn bộ thông số sản phẩm, tài liệu kỹ thuật, bài viết tin tức và thông tin giới thiệu được chuyển đổi sang ngôn ngữ tiếng Việt chuẩn ngành hóa chất/thực phẩm.
*   **Thiết kế B2B phẳng tối giản:** Bố cục dạng lưới phẳng, bo góc cứng cáp (`rounded-xl`), loại bỏ các icon/đồ họa thừa, tối ưu hóa không gian đọc thông số kỹ thuật cho đối tác doanh nghiệp.
*   **Đồng bộ màu sắc thương hiệu:** Thay thế hoàn toàn màu xanh Navy gốc bằng tông màu **Xanh Lá Cây Thương Hiệu** của Sophpower (`#106d38`) ở Menu chính, thanh công cụ, các nút liên hệ và chỉ báo.
*   **Tối ưu công nghệ & SEO:** Triển khai trên Next.js 16 (App Router) + Tailwind CSS v4 giúp trang tải nhanh, tối ưu SEO onpage và khắc phục triệt để lỗi hiển thị font chữ tiếng Việt.

---

## 💻 Tech Stack (Công nghệ)

*   **Framework:** Next.js 16.1.3 (React 19, App Router)
*   **Styling:** Tailwind CSS v4 (sử dụng cấu hình `@theme` trực tiếp)
*   **Typography:** **Roboto** Google Font (cấu hình subsets `latin` và `vietnamese` tránh lỗi font chữ tiếng Việt, hỗ trợ fallback font hệ thống cho khả năng đa ngôn ngữ trong tương lai).
*   **Icons:** Lucide React
*   **Deployment:** Vercel (cấu hình thư mục con `web/`)

---

## 🗺️ Cấu trúc Trang & Sitemap đã triển khai

Ứng dụng được chia thành các phân hệ trang cụ thể:

1.  **Trang chủ (`/`):** Banner trượt tối giản giới thiệu nguyên liệu, lưới tab phân loại sản phẩm, và các thẻ thế mạnh doanh nghiệp.
2.  **Giới thiệu (`/about`):** Lịch sử phát triển, năng lực và các chứng nhận chất lượng quốc tế (ISO, HACCP, HALAL, Kosher, FDA).
3.  **Danh mục Nguyên liệu (`/list_2` - Thực phẩm & `/list_3` - Mỹ phẩm):** Danh sách dạng lưới các nguyên liệu (Beta-carotene, Carmine, Niacinamide, Panthenol, Ectoin, v.v.) với thiết kế card có thể click toàn vùng.
4.  **Chi tiết Sản phẩm (`/list_2/[id]` & `/list_3/[id]`):** Hiển thị chi tiết mô tả, ứng dụng kỹ thuật và quy cách đóng gói của nguyên liệu.
5.  **Trung tâm Tin tức (`/news` & `/news/[id]`):** Banner hình ảnh lớn, lưới bài viết tin tức phẳng (ẩn tóm tắt và tác giả), bộ lọc danh mục và ô tìm kiếm nhanh.
6.  **Liên hệ (`/page_5`):** Form gửi yêu cầu báo giá/mẫu thử, thông tin liên hệ độ tương phản cao, và bản đồ chỉ đường.
7.  **Tuyển dụng (`/recruitment` & `/recruitment/[id]`):** Bảng tin tuyển dụng các vị trí kỹ thuật và sales.
8.  **Tìm kiếm (`/search`):** Trang hiển thị kết quả lọc tìm kiếm theo từ khóa.
9.  **Trang Quản trị (`/admin`):** Giao diện quản trị danh mục, bài viết tin tức và phản hồi từ khách hàng (Mock Client-Side).

---

## 📁 Cấu trúc Thư mục

```
├── .agents/                 # Thư mục cấu hình workflow của trợ lý AI
├── web/                     # Mã nguồn dự án Next.js (ứng dụng web chính)
│   ├── public/              # Hình ảnh tĩnh, icon và tài nguyên logo
│   └── src/
│       ├── app/             # Các trang (pages) và layouts Next.js
│       └── components/      # Các thành phần giao diện dùng chung (Header, Footer)
├── BRAND_COLORS.md          # Hướng dẫn bảng màu thương hiệu chính thức
└── PROJECT_OVERVIEW.md      # Tài liệu tổng quan dự án tiếng Việt
```

---

## 🚀 Khởi chạy Cục bộ (Local)

1. Mở cửa sổ dòng lệnh và di chuyển vào thư mục `web`:
   ```bash
   cd web
   ```
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Khởi chạy máy chủ phát triển Next.js:
   ```bash
   npm run dev
   ```
4. Truy cập địa chỉ: [http://localhost:3000](http://localhost:3000) trên trình duyệt.

---

## ☁️ Triển khai lên Vercel

Vì mã nguồn chính nằm ở thư mục con `web/`, khi cấu hình dự án trên Vercel, anh/chị **BẮT BUỘC** phải chỉnh thiết lập **Root Directory**:

1. Liên kết dự án Vercel tới repository này.
2. Tại màn hình cấu hình dự án (hoặc vào **Project Settings > General**):
   * Chỉnh phần **Root Directory** thành: `web`
3. Bấm **Save** (Lưu) và tiến hành Deploy. Vercel sẽ tự động cấu hình các lệnh build phù hợp.

---

## 📄 Giấy phép

Được phát hành dưới [Giấy phép MIT](LICENSE). Thiết kế và phát triển dành riêng cho Sophpower Việt Nam.

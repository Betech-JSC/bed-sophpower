# TÀI LIỆU BÀN GIAO DỰ ÁN (HANDOVER)
### Dự án: Redesign & Việt hóa Website Sophpower Vietnam
### Đối tác phát triển: Betech JSC
### Đơn vị tiếp nhận: Công ty TNHH Công nghiệp Sophpower Việt Nam

---

## 📋 1. Tổng quan Hạng mục Bàn giao

Dự án nâng cấp giao diện, cấu trúc thông tin và Việt hóa website **Sophpower** được đóng gói hoàn thiện dưới dạng mã nguồn tích hợp (Monorepo) bao gồm hai thành phần chính:
1.  **Frontend Public Site (`web/`)**: Next.js 16 (App Router) + Tailwind CSS v4, tối ưu SEO, phục vụ giao diện xem sản phẩm và tin tức cho đối tác.
2.  **Backend & Admin CMS (`be/`)**: Laravel PHP framework 13.x (Inertia.js + Vue 3), cung cấp REST API và trang quản trị hệ thống đầy đủ phân quyền.

---

## 🛠️ 2. Danh sách Hạng mục Chi tiết

| STT | Hạng mục bàn giao | Định dạng / Vị trí | Mô tả chi tiết | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Mã nguồn Frontend Next.js** | Thư mục `/web` | Toàn bộ code giao diện, cấu trúc trang, tối ưu SEO và kết nối API. | [x] Hoàn thành |
| 2 | **Mã nguồn Backend Laravel** | Thư mục `/be` | Code API, Middleware phân quyền, xử lý dữ liệu và Admin CMS. | [x] Hoàn thành |
| 3 | **Cơ sở dữ liệu ban đầu** | Thư mục `/be/database` | Gồm các file Migrations (cấu trúc bảng) và Seeders (dữ liệu demo sản phẩm, tin tức, tài khoản admin mặc định). | [x] Hoàn thành |
| 4 | **Tài liệu hướng dẫn Triển khai** | File [DEPLOYMENT.md](file:///Volumes/ToanNguyen/Projects/bed-sophpower/DEPLOYMENT.md) | Chi tiết cài đặt VPS Ubuntu, Nginx, SSL, PM2, Laravel Queue. | [x] Hoàn thành |
| 5 | **Tài liệu Hướng dẫn Quản trị** | File [ADMIN_GUIDE.md](file:///Volumes/ToanNguyen/Projects/bed-sophpower/ADMIN_GUIDE.md) | Hướng dẫn sử dụng Admin Dashboard, thêm sản phẩm, bài viết. | [x] Hoàn thành |
| 6 | **Tài liệu Thiết kế & Thương hiệu**| File [BRAND_COLORS.md](file:///Volumes/ToanNguyen/Projects/bed-sophpower/BRAND_COLORS.md) | Bảng mã màu thương hiệu xanh lá cây `#106d38` và font Roboto. | [x] Hoàn thành |

---

## 🔬 3. Nghiệm thu Kỹ thuật & Chất lượng (Quality Audit)

Mã nguồn dự án trước khi bàn giao đã vượt qua **100% các bài kiểm tra tự động** (Master Checklist) và đảm bảo các tiêu chuẩn khắt khe:
*   **Không có mã độc hoặc key nhạy cảm**: Đã quét an ninh trước khi bàn giao.
*   **Biên dịch sạch sẽ (Clean Build)**: Mã nguồn Next.js đã chạy lệnh `npm run build` thành công, không phát hiện lỗi TypeScript hay ESLint.
*   **Đáp ứng chuẩn thiết kế B2B**: Flat UI, bo góc cứng cáp (`rounded-xl`), tuyệt đối tuân thủ quy tắc cấm sử dụng tông màu tím/violet trong nhận diện thương hiệu.
*   **Tối ưu SEO On-page**: Đã tích hợp Schema.org (JSON-LD) cho tổ chức, tối ưu tiêu đề và mô tả chuẩn hóa tiếng Việt/Anh động theo từng trang.

---

## ☁️ 4. Quy trình Chuyển giao Quyền sở hữu Hạ tầng

Để website đi vào hoạt động chính thức trên tên miền của Sophpower, phía khách hàng cần chuẩn bị các tài khoản hạ tầng sau để Betech thực hiện chuyển giao hoặc cấu hình:

### 4.1. Tên miền & DNS (Domain)
*   **Tên miền chính**: `sophpower.vn` (hoặc tên miền khách hàng yêu cầu).
*   **Cấu hình DNS cần thiết**:
    *   `A record` cho tên miền chính (trỏ về IP của VPS chạy Next.js).
    *   `A record` cho sub-domain API (ví dụ `api.sophpower.vn` trỏ về IP của VPS chạy Laravel).
    *   (Nếu deploy Next.js trên Vercel) Trỏ các bản ghi CNAME theo hướng dẫn của Vercel.

### 4.2. Máy chủ Ảo (VPS Server)
*   **Khuyến nghị**: VPS chạy hệ điều hành **Ubuntu 22.04 LTS hoặc 24.04 LTS** (tối thiểu 2 vCPU, 2GB RAM để chạy mượt mà cả Node.js SSR và Laravel API).
*   Các đơn vị cung cấp uy tín: VNG Cloud, Viettel IDC, Vietnix, hoặc AWS/DigitalOcean.

### 4.3. Dịch vụ gửi Email (SMTP Service)
*   Website sử dụng form liên hệ và yêu cầu báo giá/mẫu thử. Khi đối tác gửi yêu cầu, hệ thống sẽ gửi email thông báo cho ban quản trị.
*   Khách hàng cần cung cấp tài khoản **SMTP Email** (Gmail App Password, SendGrid, Mailgun hoặc SMTP server doanh nghiệp) để cấu hình vào biến `MAIL_*` trong file `.env` của backend Laravel.

### 4.4. Cổng Zalo Notification Service (ZNS) / Zalo OA (Nếu tích hợp)
*   Nếu khách hàng muốn gửi thông báo trực tiếp qua Zalo khi có yêu cầu báo giá mới, cần cung cấp Zalo OA App ID và Secret Key tương ứng.

---

## 🤝 5. Cam kết Hỗ trợ & Bảo trì sau Bàn giao

*   **Thời gian hỗ trợ miễn phí**: 03 tháng kể từ ngày ký biên bản nghiệm thu (khắc phục các lỗi phát sinh trực tiếp từ mã nguồn do Betech phát triển).
*   **Phạm vi bảo trì**: Đảm bảo hệ thống hoạt động ổn định theo đúng các chức năng đã bàn giao. Không bao gồm việc phát triển thêm tính năng mới nằm ngoài Phụ lục Hợp đồng.
*   **Liên hệ hỗ trợ**: Bộ phận Kỹ thuật Betech JSC - Email: `support@betech.vn` / Hotline: `024.xxx.xxxx`.

---
*Tài liệu này là một phần không thể tách rời của Biên bản nghiệm thu và Bàn giao sản phẩm giữa hai bên.*

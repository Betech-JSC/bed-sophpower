# Kế hoạch Triển khai Module Quản lý File trong CMS

## Overview
Dự án yêu cầu bổ sung phân hệ **Quản lý File** (File Manager / Media Manager) trong hệ thống quản trị (CMS) để quản trị viên có thể:
- Tải lên các tệp tài liệu, hình ảnh, văn bản (PDF, Word, Excel, ZIP, v.v.).
- Xem danh sách tệp dưới dạng lưới hoặc bảng kèm ảnh xem trước và dung lượng.
- Tìm kiếm tệp theo tên và lọc theo định dạng (Hình ảnh, Tài liệu, Tệp khác).
- Sao chép nhanh đường dẫn URL tệp để chèn vào Rich Text Editor hoặc liên kết khác.
- Xóa tệp khỏi hệ thống (đồng thời xóa tệp vật lý trong ổ đĩa lưu trữ).
- Ghi nhật ký hoạt động (Activity Logs) cho các thao tác tải lên hoặc xóa tệp.

---

## User Review Required
> [!IMPORTANT]
> - Các tệp sẽ được lưu trữ trực tiếp vào thư mục `public/storage/uploads` của Laravel.
> - Cung cấp tính năng sao chép URL tuyệt đối của tệp để quản trị viên dễ dàng liên kết ở bất kỳ đâu.

---

## Proposed Changes

### 1. Database & Model (P0 - Foundation)

#### [NEW] `2026_06_15_060000_create_media_files_table.php` (Migration)
Tạo bảng `media_files` để quản lý siêu dữ liệu (metadata) của tệp:
- `id` (Khóa chính)
- `name` (Tên tệp gốc khi tải lên)
- `file_path` (Đường dẫn lưu trữ tương đối, ví dụ: `uploads/2026/06/filename.pdf`)
- `file_type` (MIME type hoặc phân loại tệp)
- `file_size` (Dung lượng tệp tính bằng bytes)
- `timestamps`

#### [NEW] `MediaFile.php` (Model)
- Định nghĩa model `MediaFile` tại `be/app/Models/MediaFile.php`.
- Định nghĩa các fillable attributes và bổ sung attribute tự động tính toán URL tuyệt đối cho tệp (`url`).

---

### 2. Business Logic & Routing (P1 - Core Backend)

#### [NEW] `MediaController.php` (Controller)
Xây dựng controller tại `be/app/Http/Controllers/Admin/MediaController.php` với các hàm:
- `index()`: Truy vấn danh sách tệp tin (hỗ trợ phân trang, tìm kiếm theo tên, lọc theo loại file: hình ảnh, tài liệu, tệp khác). Trả về view Inertia.
- `store()`: Nhận tệp tải lên từ request, kiểm tra định dạng và dung lượng (tối đa 10MB), lưu tệp vật lý vào đĩa `public` dưới thư mục `uploads/`, lưu thông tin vào DB, và gọi `ActivityLogger::log()`.
- `destroy()`: Xóa tệp vật lý bằng `Storage::disk('public')->delete()` và xóa bản ghi tương ứng trong database, đồng thời ghi log hoạt động.

#### [MODIFY] `routes/web.php` (Routes)
Đăng ký các route cho Media Manager:
- `GET /admin/media` -> `MediaController@index` (Đặt tên: `admin.media.index`)
- `POST /admin/media` -> `MediaController@store` (Đặt tên: `admin.media.store`)
- `DELETE /admin/media/{media}` -> `MediaController@destroy` (Đặt tên: `admin.media.destroy`)

---

### 3. Giao diện CMS & Sidebar Navigation (P2 - Web UI)

#### [MODIFY] `CrmLayout.vue` (Layout)
- Thêm mục **"Quản lý File"** vào danh sách menu điều hướng bên trái (dưới mục "Quản lý nhãn dịch" hoặc vị trí thích hợp) kèm biểu tượng phù hợp (ví dụ: `FolderOpenOutlined` hoặc `FileDoneOutlined`).

#### [NEW] `Media/Index.vue` (Inertia View Page)
Xây dựng giao diện quản trị tệp tại `be/resources/js/Pages/Media/Index.vue` sử dụng Ant Design Vue:
- **Khu vực Tải lên**: Hỗ trợ tải lên kéo thả (Drag & Drop) hoặc nút chọn tệp bằng `<a-upload-dragger>`.
- **Khu vực Bộ lọc & Tìm kiếm**: Ô tìm kiếm theo tên và các Tab lọc loại tệp (Tất cả, Hình ảnh, Tài liệu, Khác).
- **Lưới hiển thị (Grid View)**:
  - Nếu là hình ảnh: Hiển thị thumbnail của hình ảnh đó.
  - Nếu là tệp tin khác (PDF, Word, Excel, ZIP): Hiển thị biểu tượng (icon) đại diện cho loại tệp tương ứng.
  - Hiển thị tên tệp, định dạng, kích thước (được format ra KB/MB) và ngày tải lên.
- **Thao tác nhanh**:
  - Sao chép nhanh đường dẫn URL (Copy URL) vào bộ nhớ tạm với thông báo Toast thành công.
  - Nút Xóa tệp (Delete) có hộp thoại xác nhận (Confirm Dialog).

---

## Verification Plan

### Automated Tests
- Biên dịch thành công dự án CMS:
  ```bash
  npm run build
  ```

### Manual Verification
1. Truy cập vào mục **Quản lý File** trên CMS Sidebar.
2. Tải lên thử nghiệm một vài tệp hình ảnh (.png, .jpg) và tài liệu (.pdf, .docx).
3. Kiểm tra xem ảnh hiển thị đúng dạng thumbnail và tài liệu hiển thị đúng biểu tượng đại diện hay không.
4. Nhấn nút **Copy URL** và dán thử xem đường dẫn tuyệt đối có truy cập chính xác không.
5. Thực hiện tìm kiếm và lọc danh mục xem kết quả có cập nhật theo thời gian thực không.
6. Nhấn xóa một tệp bất kỳ, xác nhận tệp vật lý bị xóa khỏi thư mục lưu trữ cục bộ và bản ghi biến mất trong CMS.
7. Truy cập **Nhật ký hoạt động** để xác thực các hành động "Tải lên tệp" và "Xóa tệp" đã được lưu lại đầy đủ.

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass
- Security: ✅ No critical issues
- Build: ✅ Success
- Date: 2026-06-15

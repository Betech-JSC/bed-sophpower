# Kế hoạch triển khai: Hệ thống quản lý nhãn dịch động (Dynamic Translations)

Tài liệu này chi tiết kế hoạch xây dựng cơ sở dữ liệu dịch nhãn tĩnh, giao diện quản lý CRUD trong Laravel CMS (Inertia.js + Vue 3 + Ant Design), và tích hợp API với Next.js Storefront (React 19).

## Project Type
- Explicit: **WEB** + **BACKEND**

## Success Criteria
- [x] Quản trị viên có thể xem danh sách, lọc, và chỉnh sửa nội dung dịch của tất cả các nhãn tĩnh (`siteDictionaries` & `dictionaries`) trực tiếp trong CMS cho 4 ngôn ngữ: Tiếng Việt (vi), Tiếng Anh (en), Tiếng Trung (zh), Tiếng Nhật (ja).
- [x] Next.js Storefront tự động cập nhật nội dung dịch mới từ API Laravel.
- [x] Sử dụng cơ chế ISR (Next.js Cache & Revalidate) để đảm bảo hiệu năng tải trang tối đa (không làm chậm trang web công cộng).
- [x] Có phương án fallback bằng file tĩnh (nếu backend ngoại tuyến, frontend vẫn hoạt động bình thường).
- [x] Khống chế lỗi Hydration Mismatch bằng cách merge dữ liệu đồng bộ trong I18nProvider.

## Tech Stack
- **Backend (CMS)**: Laravel 13, Eloquent ORM, Inertia.js, Vue 3, Ant Design Vue, MySQL.
- **Frontend (Storefront)**: Next.js 16 (App Router, React 19), Tailwind CSS.

---

## Tasks

- [x] **Task 1: Tạo Migration cho bảng `translations`**
  - **Agent**: `database-architect`
  - **Skills**: `database-design`
  - **Verify**: Chạy `php artisan migrate:status` hiển thị migration mới chưa chạy.
  
- [x] **Task 2: Tạo Model `Translation`**
  - **Agent**: `backend-specialist`
  - **Skills**: `clean-code`
  - **Verify**: Kiểm tra model hỗ trợ `$casts = ['text' => 'array']`.

- [x] **Task 3: Viết script trích xuất và Seed dữ liệu ban đầu**
  - **Agent**: `backend-specialist`
  - **Verify**: Chạy script xuất JSON, sau đó chạy `php artisan migrate --seed` thành công. Bảng `translations` có ~200 dòng dữ liệu đầy đủ vi/en/zh/ja.

- [x] **Task 4: Thêm Routes quản trị & Cấu hình menu**
  - **Agent**: `backend-specialist`
  - **Verify**: Sidebar trong CMS hiển thị mục "Quản lý nhãn dịch", click vào dẫn đến route `/admin/translations`.

- [x] **Task 5: Tạo Controller `TranslationController`**
  - **Agent**: `backend-specialist`
  - **Verify**: Hỗ trợ Index (phân trang, tìm kiếm, lọc theo group), Edit, và Update.

- [x] **Task 6: Tạo các View Inertia `Index.vue` và `Form.vue`**
  - **Agent**: `frontend-specialist`
  - **Verify**: Giao diện hiển thị danh sách nhãn, có thanh tìm kiếm, bộ lọc group. Form chỉnh sửa hỗ trợ 4 tab nhập Tiếng Việt, Tiếng Anh, Tiếng Trung, Tiếng Nhật.

- [x] **Task 7: Viết API Endpoint `/api/translations` trên Laravel**
  - **Agent**: `backend-specialist`
  - **Verify**: `curl http://localhost:8000/api/translations` trả về JSON dạng cấu trúc đa cấp chứa bản dịch.

- [x] **Task 8: Nâng cấp `I18nProvider` và tích hợp API với Next.js**
  - **Agent**: `frontend-specialist`
  - **Verify**: `RootLayout` lấy bản dịch động từ API bằng fetch (có revalidate: 60), truyền vào `I18nProvider`. `I18nProvider` thực hiện mutate đè lên `siteDictionaries` và `dictionaries` toàn cục đồng bộ trước khi render.

---

## Phase X: Verification
- [x] Linter & Type Check pass
- [x] Tải trang chủ Next.js và thay đổi bản dịch thành công mà không có lỗi Hydration Mismatch

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass
- Security: ✅ No critical issues
- Build: ✅ Success
- Date: 2026-06-15

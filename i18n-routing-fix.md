# Kế hoạch chi tiết: Sửa lỗi URL Route Đa Ngôn Ngữ (i18n-routing-fix)

Kế hoạch này sửa đổi cấu hình và logic route của web storefront để hỗ trợ URL đa ngôn ngữ (tiếng Việt & tiếng Anh) động thông qua Next.js Rewrites.

## Success Criteria
- [x] Cập nhật `web/next.config.ts` hỗ trợ rewrites cho `/food-ingredients` và `/cosmetic-ingredients`.
- [x] Cập nhật `provider.tsx` xử lý chuyển hướng URL động trong `setLocale`.
- [x] Cập nhật `Header` menu link và logic active tab động theo locale.
- [x] Cập nhật các trang danh mục sản phẩm (`page.tsx`) truyền basePath động.
- [x] Cập nhật các trang chi tiết sản phẩm (`[id]/page.tsx`) breadcrumbs, alternates và related products link.
- [x] Đảm bảo web build thành công không lỗi compile.

## Danh sách công việc (Task Breakdown)

### Task 1: Cập nhật Next.js Config & Rewrites
- **Agent**: `frontend-specialist`
- **Skills**: `nextjs-react-expert`
- **Input**: file `web/next.config.ts`
- **Output**: Cấu hình rewrites map URL tiếng Anh sang route tiếng Việt tương ứng.
- **Verify**: Chạy build thử xem config có hợp lệ không.

### Task 2: Cập nhật i18n Provider & Language Switching Logic
- **Agent**: `frontend-specialist`
- **Skills**: `clean-code`
- **Input**: file `web/src/i18n/provider.tsx`
- **Output**: Hàm `setLocale` chuyển đổi URL động khi thay đổi locale.
- **Verify**: Kiểm tra logic thay thế pathname hoạt động đúng cho cả hai hướng.

### Task 3: Cập nhật Header & Link Navigation
- **Agent**: `frontend-specialist`
- **Skills**: `clean-code`
- **Input**: file `web/src/components/layout/header/index.tsx`
- **Output**: menuItems và logic isActive động theo locale.
- **Verify**: Xác nhận menu hiển thị đúng link tiếng Anh khi locale là en.

### Task 4: Động hóa các trang sản phẩm (Listing & Details)
- **Agent**: `frontend-specialist`
- **Skills**: `clean-code`
- **Input**: các file trong `web/src/app/nguyen-lieu-thuc-pham` và `web/src/app/nguyen-lieu-my-pham`.
- **Output**: breadcrumbs, basePath, và related products link động theo locale.
- **Verify**: Bấm thử các liên kết trong trang chi tiết xem có dẫn đến URL tiếng Anh khi ở chế độ en không.

### Task 5: Chạy kiểm tra & Hoàn tất Phase X
- **Agent**: `devops-engineer`
- **Skills**: `powershell-windows`
- **Verify**: Chạy build `npm run build` thành công.

---

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass
- Security: ✅ No critical issues
- Build: ✅ Success
- Date: 2026-06-17

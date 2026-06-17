# Kế hoạch chi tiết: Tạo Tài liệu Bàn giao Dự án (handover-docs)

Kế hoạch này chi tiết hóa việc xây dựng bộ tài liệu bàn giao chuẩn hóa cho Sophpower Vietnam, được tích hợp trực tiếp trong mã nguồn dự án.

## Success Criteria
- [x] Tạo mới thành công file `HANDOVER.md` tại thư mục gốc.
- [x] Tạo mới thành công file `DEPLOYMENT.md` tại thư mục gốc.
- [x] Tạo mới thành công file `ADMIN_GUIDE.md` tại thư mục gốc.
- [x] Kiểm tra liên kết và định dạng markdown sạch sẽ.
- [x] Chạy `python .agents/scripts/checklist.py .` thành công không có lỗi.

## Tech Stack & Môi trường triển khai giả định
- **Hệ điều hành**: Ubuntu 22.04 LTS hoặc mới hơn.
- **Web Server**: Nginx (làm reverse proxy và phục vụ static content).
- **Backend API**: PHP 8.2 + Composer + Laravel 10/11 + MySQL 8.0.
- **Frontend SSR**: Node.js v20+ + PM2 + Next.js 16 (App Router).

## Danh sách công việc (Task Breakdown)

### Task 1: Tạo tài liệu HANDOVER.md (Checklist & Hạng mục bàn giao)
- **Agent**: `project-planner`
- **Skills**: `clean-code`, `plan-writing`
- **Input**: Cấu trúc thư mục hiện tại của dự án, thông tin dự án trong `PROJECT_OVERVIEW.md`.
- **Output**: File `HANDOVER.md` hoàn chỉnh.
- **Verify**: Xem file và kiểm tra các mục checklist bàn giao có đầy đủ không.

### Task 2: Tạo tài liệu DEPLOYMENT.md (Hướng dẫn triển khai VPS chi tiết)
- **Agent**: `devops-engineer`
- **Skills**: `deployment-procedures`, `server-management`
- **Input**: Cấu trúc của thư mục `web/` (Next.js) và `be/` (Laravel).
- **Output**: File `DEPLOYMENT.md` chi tiết từ cài đặt PHP/Node, cấu hình Database, tạo PM2/Systemd service, cấu hình Nginx reverse proxy và cài đặt SSL Certbot.
- **Verify**: Rà soát các block lệnh config Nginx, PM2 để đảm bảo độ chính xác kỹ thuật.

### Task 3: Tạo tài liệu ADMIN_GUIDE.md (Hướng dẫn sử dụng trang quản trị)
- **Agent**: `frontend-specialist`
- **Skills**: `clean-code`
- **Input**: Cấu trúc các trang admin Mock client-side trong `/admin` (Next.js) và API endpoints hỗ trợ trong `be/`.
- **Output**: File `ADMIN_GUIDE.md` hướng dẫn chi tiết cách quản lý sản phẩm, tin tức, tuyển dụng, form liên hệ và leads.
- **Verify**: Đảm bảo các mô tả chức năng khớp chính xác với UI thực tế của Dashboard.

### Task 4: Chạy kiểm định cuối cùng (Final Quality Audit)
- **Agent**: `project-planner`
- **Skills**: `clean-code`
- **Input**: Mã nguồn và tài liệu mới tạo.
- **Output**: Kết quả chạy thành công của script checklist.
- **Verify**:
  ```bash
  python .agents/scripts/checklist.py .
  ```

---

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass
- Security: ✅ No critical issues
- Build: ✅ Success
- Date: 2026-06-17

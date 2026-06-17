# HƯỚNG DẪN SỬ DỤNG TRANG QUẢN TRỊ (ADMIN CMS GUIDE)
### Dự án: Hệ thống quản lý nội dung Website Sophpower Vietnam

Tài liệu này dành cho Quản trị viên (Admin) của Công ty TNHH Công nghiệp Sophpower Việt Nam, hướng dẫn chi tiết cách cập nhật thông tin sản phẩm, bài viết tin tức, tuyển dụng, và quản lý liên hệ báo giá từ đối tác.

---

## 🔐 1. Hướng dẫn Đăng nhập & Bảo mật tài khoản

### 1.1. Địa chỉ truy cập
*   **Môi trường Staging/Local**: `http://127.0.0.1:8000/admin`
*   **Môi trường chạy thật (Production)**: `https://api.sophpower.vn/admin` (hoặc domain CMS do doanh nghiệp cấu hình).

### 1.2. Tài khoản quản trị mặc định (sau khi cài đặt)
*   **Email**: `admin@sophpower.com`
*   **Mật khẩu**: `admin123`

> [!CAUTION]
> **Hành động bắt buộc ngay sau khi tiếp nhận**:
> Đăng nhập vào hệ thống, truy cập góc trên bên phải màn hình ➡️ chọn **Hồ sơ của tôi (Profile)** ➡️ Tiến hành **Đổi mật khẩu mới** có độ phức tạp cao (tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt) để bảo mật hệ thống.

---

## 📦 2. Quản lý Sản phẩm (Products & Categories)

Website Sophpower chia làm 2 mảng sản phẩm chính: **Nguyên liệu Thực phẩm (Food Ingredients)** và **Nguyên liệu Mỹ phẩm (Cosmetic Ingredients)**.

### 2.1. Quản lý danh mục sản phẩm (Categories)
Trước khi thêm sản phẩm, hãy chắc chắn danh mục tương ứng đã tồn tại.
1.  Truy cập menu **Danh mục sản phẩm** ở thanh điều hướng bên trái.
2.  Chọn **Thêm mới**.
3.  Nhập tên danh mục bằng 2 ngôn ngữ (Tiếng Việt & Tiếng Anh) để đảm bảo hiển thị đúng trên giao diện người dùng.

### 2.2. Thêm mới / Cập nhật Sản phẩm
1.  Truy cập menu **Quản lý sản phẩm** ➡️ Chọn **Thêm sản phẩm**.
2.  Nhập đầy đủ các thông tin bắt buộc:
    *   **Tên sản phẩm** (Nhập cả Tiếng Việt & Tiếng Anh). Ví dụ: `Bột Beta-carotene` / `Beta-carotene Powder`.
    *   **Đường dẫn thân thiện (Slug)**: Hệ thống tự động tạo, dùng cho đường dẫn URL SEO sạch.
    *   **Loại sản phẩm**: Chọn `Thực phẩm` hoặc `Mỹ phẩm` để sản phẩm tự động hiển thị ở đúng phân trang.
    *   **Ảnh đại diện**: Tải lên hình ảnh rõ nét của sản phẩm (ảnh nền trắng hoặc ảnh chất lượng cao dạng phòng thí nghiệm).
    *   **Mô tả ngắn & Mô tả chi tiết** (Song ngữ): Giới thiệu chung về sản phẩm.
    *   **Thông số kỹ thuật (Specifications)**: Nhập dạng danh sách dòng thông số kỹ thuật (độ tinh khiết, dạng vật lý, hạn sử dụng).
    *   **Ứng dụng thực tế (Applications)**: Nêu rõ sản phẩm được ứng dụng trong các ngành công nghiệp nào (sản xuất nước giải khát, làm kem dưỡng da).
    *   **Quy cách đóng gói (Packaging)**: Nhập thông tin đóng gói tiêu chuẩn (Thùng 20kg, phuy nhựa).
3.  **Tối ưu SEO**: Cuộn xuống cuối form để điền **SEO Title** và **SEO Description** riêng cho sản phẩm đó.
4.  Nhấp **Lưu lại**.

---

## 📰 3. Quản lý Trung tâm Tin tức (News & Articles)

Tin tức giúp doanh nghiệp quảng bá thế mạnh công nghệ và cập nhật xu hướng thị trường.

### 3.1. Đăng bài viết mới
1.  Truy cập menu **Quản lý bài viết** ➡️ Chọn **Viết bài mới**.
2.  Nhập các trường thông tin:
    *   **Tiêu đề bài viết** (Song ngữ): Tiêu đề hấp dẫn, chứa từ khóa SEO.
    *   **Ảnh đại diện tin tức**: Kích thước khuyến nghị `800x600px`.
    *   **Danh mục tin tức**: Chọn phân loại phù hợp (Mỹ phẩm, Thực phẩm, Thị trường).
    *   **Mô tả ngắn (Tóm tắt)**: Đoạn văn ngắn thu hút người đọc ngoài trang danh sách.
    *   **Nội dung chi tiết**: Sử dụng trình soạn thảo trực quan (WYSIWYG) để định dạng văn bản, thêm hình ảnh minh họa bên trong bài viết.
3.  Nhấp **Đăng bài**. Bài viết sẽ tự động xuất hiện trên trang tin tức công cộng của website Next.js.

---

## 👥 4. Quản lý Tuyển dụng (Recruitment Board)

Quản lý danh sách các vị trí đang tuyển dụng của doanh nghiệp.

1.  Truy cập menu **Quản lý tuyển dụng** ➡️ Chọn **Thêm vị trí**.
2.  Nhập các thông tin:
    *   **Tên vị trí** (Ví dụ: `Nhân Viên Kinh Doanh B2B`).
    *   **Phòng ban / Địa điểm làm việc** (Ví dụ: `Phòng Kinh doanh` / `TP. Hồ Chí Minh`).
    *   **Mức lương**: Có thể nhập mức lương cụ thể hoặc để `Thỏa thuận`.
    *   **Hạn nộp hồ sơ**: Nhập ngày kết thúc nhận hồ sơ.
    *   **Mô tả công việc, Yêu cầu ứng viên, Quyền lợi**: Nhập dạng danh sách các đầu việc để ứng viên dễ theo dõi.
3.  Nhấp **Lưu**. Tin tuyển dụng sẽ tự động hết hạn hiển thị trên website sau khi qua ngày hạn nộp hồ sơ.

---

## 📧 5. Xử lý yêu cầu báo giá và mẫu thử (Leads Management)

Khi đối tác gửi yêu cầu báo giá/mẫu thử từ trang **Liên hệ** hoặc gửi câu hỏi từ **Trang chi tiết sản phẩm**, hệ thống sẽ xử lý như sau:
1.  Gửi email thông báo tự động về hòm mail cấu hình của Ban quản trị.
2.  Lưu thông tin yêu cầu vào cơ sở dữ liệu làm một **Lead**.

### Quy trình quản lý yêu cầu:
1.  Truy cập menu **Yêu cầu liên hệ (Leads)**. Bạn sẽ nhìn thấy danh sách các yêu cầu mới kèm theo: Họ tên, Email, Số điện thoại, Nội dung yêu cầu và Sản phẩm cần hỏi (nếu có).
2.  Các yêu cầu mới sẽ có trạng thái là **Chờ xử lý (Pending)**.
3.  Sau khi bộ phận kinh doanh liên hệ hỗ trợ đối tác qua điện thoại hoặc email, quản trị viên nhấp vào nút **Đã xử lý (Processed)** trên dòng tương ứng để đánh dấu hoàn thành, giúp đồng bộ tiến độ làm việc của đội ngũ.

---

## ⚙️ 6. Cấu hình Hệ thống (System Settings)

Cho phép quản trị viên thay đổi các cài đặt quan trọng của website mà không cần can thiệp vào mã nguồn.

### 6.1. Cấu hình Thông tin liên hệ
Truy cập menu **Cấu hình hệ thống** ➡️ Cập nhật các thông tin hiển thị ở chân trang (Footer) và trang Liên hệ:
*   Số điện thoại Hotline.
*   Email tiếp nhận thông tin.
*   Địa chỉ trụ sở chính (Nhập song ngữ để hiển thị đúng khi chuyển đổi ngôn ngữ Việt - Anh).

### 6.2. Cấu hình SEO & Mạng xã hội
*   **Meta Title & Meta Description**: Nhập tiêu đề và mô tả chính của website. Đây là thông tin hiển thị trên trang kết quả tìm kiếm của Google khi người dùng tìm kiếm tên công ty.
*   **Social Links**: Điền các link mạng xã hội của công ty (Facebook Page, LinkedIn, Youtube, Zalo OA). Hệ thống sẽ tự động cập nhật các icon liên kết tương ứng trên trang web Next.js.
*   **Header / Footer Scripts**: Dán mã nhúng của Google Analytics, Facebook Pixel, hoặc widget Chat hỗ trợ trực tuyến (Zalo chat, Tawk.to) vào ô tương ứng để theo dõi lưu lượng truy cập.

---

## 🌐 7. Quản lý nhãn dịch động (Translations)

Một số nhãn tĩnh trên giao diện (ví dụ chữ trên các nút bấm như `Gửi liên hệ`, `Tìm hiểu thêm`, chữ placeholder trong form tìm kiếm) có thể được thay đổi từ trang quản trị:
1.  Truy cập menu **Nhãn dịch (Translations)**.
2.  Tìm nhãn cần sửa bằng thanh tìm kiếm.
3.  Thay đổi giá trị tương ứng ở cột **Tiếng Việt** hoặc **Tiếng Anh**.
4.  Nhấp **Lưu**. Thay đổi sẽ được phản ánh trên giao diện website Next.js sau tối đa 10 giây nhờ cơ chế tự động revalidate cache.

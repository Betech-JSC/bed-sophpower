# HƯỚNG DẪN CHUYỂN WEBSITE SANG MÁY CHỦ MỚI

**Kính gửi:** Bộ phận IT / người quản lý tên miền của **<TÊN_CÔNG_TY>**
**Tên miền áp dụng:** `<TÊN_MIỀN>`
**Thời gian thực hiện:** khoảng 10 phút
**Ngày ban hành:** `<dd/mm/yyyy>`

---

## Mục đích

Website của Quý công ty đã được chuyển sang máy chủ mới đặt tại Việt Nam (nhanh hơn, ổn định hơn
cho người truy cập trong nước). Để website hiển thị từ máy chủ mới, Quý công ty chỉ cần
**cập nhật 02 bản ghi DNS** và **thêm 01 bản ghi** trong bảng dưới đây.

> ✅ Sau khi cập nhật: website vẫn là website cũ, **không mất dữ liệu**, **không phải cài lại gì**.
> ⚠️ **Email doanh nghiệp của Quý công ty KHÔNG bị ảnh hưởng**, miễn là giữ nguyên các bản ghi
> ở Mục 2.

---

## 1. Ba bản ghi cần cập nhật

| STT | Loại (Type) | Tên (Host) | Giá trị mới (Value) | Thay cho giá trị cũ |
|:---:|:---:|---|---|---|
| 1 | `A` | `@` | `<IP_VPS>` | `216.198.79.1` |
| 2 | `CNAME` | `www` | `<TÊN_MIỀN>` | `vercel-dns-017.com` |
| 3 | `A` | `api` | `<IP_VPS>` | *(thêm mới nếu chưa có)* |

- **TTL:** `600` (10 phút) cho cả ba bản ghi.
- Nếu bản ghi `api` **đã tồn tại**: chỉ cần kiểm tra giá trị đúng `<IP_VPS>`, không tạo trùng.

---

## 2. ⚠️ Các bản ghi TUYỆT ĐỐI KHÔNG xoá hoặc sửa

Đây là cấu hình **email doanh nghiệp Aliyun** đang chạy. Xoá hoặc sửa sẽ làm **toàn bộ email
của công ty ngừng nhận và ngừng gửi** (dù website vẫn chạy bình thường).

| Loại | Tên | Giá trị | Vai trò |
|---|---|---|---|
| `CNAME` | `mail` | `mail.qiye.aliyun.com` | Truy cập webmail |
| `CNAME` | `smtp` | `smtp.qiye.aliyun.com` | Gửi email |
| `CNAME` | `imap` | `imap.qiye.aliyun.com` | Đồng bộ email (IMAP) |
| `CNAME` | `pop3` | `pop3.qiye.aliyun.com` | Đồng bộ email (POP3) |
| `MX` | `@` | `mx1.qiye.aliyun.com` (5) — `mx2…` (10) — `mx3…` (15) | Nhận email |
| `TXT` | `@` | `v=spf1 include:spf.qiye.aliyun.com -all` | Chống giả mạo email (SPF) |

👉 **Chỉ sửa đúng 3 bản ghi ở Mục 1. Mọi bản ghi khác giữ nguyên.**

---

## 3. Các bước thực hiện (trên trang quản trị DNS Aliyun)

1. Đăng nhập **https://dns.console.aliyun.com** bằng tài khoản đang quản lý tên miền `<TÊN_MIỀN>`.
2. Chọn tên miền `<TÊN_MIỀN>` trong danh sách.
3. Tìm bản ghi **`@`** loại **`A`** → bấm **Sửa (Edit)** → thay giá trị thành `<IP_VPS>` → TTL `600` → **Lưu**.
4. Tìm bản ghi **`www`** loại **`CNAME`** → bấm **Sửa** → thay giá trị thành `<TÊN_MIỀN>` → TTL `600` → **Lưu**.
5. Nếu **chưa có** bản ghi `api`: bấm **Thêm bản ghi (Add Record)** → chọn loại `A`,
   tên `api`, giá trị `<IP_VPS>`, TTL `600` → **Lưu**.
6. Không thay đổi bất kỳ bản ghi nào khác.

---

## 4. Thời gian và những gì sẽ xảy ra

| Thời điểm | Hiện tượng |
|---|---|
| Ngay sau khi lưu | Bản ghi mới bắt đầu có hiệu lực |
| 5–10 phút tiếp theo | Website lan truyền dần sang máy chủ mới. Có thể người này thấy bản mới, người khác còn thấy bản cũ |
| 1–2 phút đầu | Có thể trình duyệt báo **"Kết nối không bảo mật" / lỗi chứng chỉ** — đây là hiện tượng bình thường khi chứng chỉ HTTPS đang được cấp cho máy chủ mới. Chờ 2 phút, tải lại trang |
| Sau ~10–30 phút | Ổn định hoàn toàn trên toàn quốc |

Không cần tắt website cũ, không cần thông báo cho khách hàng của Quý công ty.

---

## 5. Cách kiểm tra sau khi cập nhật

1. Mở trình duyệt ở **chế độ ẩn danh (Incognito)**, truy cập `https://<TÊN_MIỀN>`.
2. Hoặc kiểm tra lan truyền DNS tại **https://dnschecker.org** (nhập `<TÊN_MIỀN>`, chọn `A`).
3. Nếu vẫn thấy nội dung cũ: xoá cache DNS trên máy, hoặc thử bằng **4G** thay vì wifi.

---

## 6. Xác nhận hoàn tất

Sau khi lưu, Quý công ty vui lòng gửi lại cho chúng tôi:

- Ảnh chụp màn hình **bảng DNS** sau khi cập nhật;
- Thời điểm thực hiện.

Chúng tôi sẽ kiểm tra và xác nhận website đã chạy trên máy chủ mới.

---

## 7. Câu hỏi thường gặp

**Có phải làm lại website / nhập lại dữ liệu không?**
Không. Toàn bộ dữ liệu đã được chuyển sẵn. Chỉ cần trỏ tên miền.

**Email công ty có bị ảnh hưởng không?**
Không, nếu giữ nguyên các bản ghi ở Mục 2.

**Website có bị gián đoạn không?**
Chỉ khoảng 1–2 phút trong lúc chuyển, và có thể chỉ một số người dùng gặp (do DNS lan truyền).

**Có cần thay đổi Google Analytics / Search Console / Zalo OA không?**
Không. Tên miền giữ nguyên nên mọi cấu hình cũ vẫn đúng.

**Nếu cần quay lại phương án cũ thì sao?**
Vui lòng liên hệ chúng tôi — bản ghi cũ được lưu ở Phụ lục A và có thể khôi phục trong vài phút.

---

## 8. Liên hệ hỗ trợ

| | |
|---|---|
| Phụ trách kỹ thuật | `<HỌ_TÊN>` |
| Điện thoại / Zalo | `<SỐ_ĐIỆN_THOẠI>` |
| Email | `<EMAIL>` |

---

## Phụ lục A — Thông tin kỹ thuật (dành cho bộ phận IT)

| Bản ghi | Trước khi chuyển | Sau khi chuyển |
|---|---|---|
| `A @` | `216.198.79.1` | `<IP_VPS>` |
| `CNAME www` | `vercel-dns-017.com` | `<TÊN_MIỀN>` |
| `A api` | *(không có)* | `<IP_VPS>` |

- Website: `https://<TÊN_MIỀN>` (Next.js, máy chủ `<IP_VPS>`, Nginx + HTTPS Let's Encrypt).
- Trang quản trị: `https://api.<TÊN_MIỀN>/admin` (đăng nhập bằng tài khoản được cấp riêng).
- Nếu cần khôi phục phương án cũ: trả `A @` về `216.198.79.1` và `CNAME www` về `vercel-dns-017.com`,
  chờ 10 phút.

---

## Phụ lục B — Mẫu tin nhắn gửi kèm tài liệu này

> Kính gửi anh/chị `<TÊN_NGƯỜI_NHẬN>`,
>
> Bên em đã hoàn tất phần máy chủ mới cho website `<TÊN_MIỀN>`. Nhờ anh/chị cập nhật giúp
> **3 bản ghi DNS** theo tài liệu đính kèm (Mục 1) — chỉ mất khoảng 10 phút.
>
> Xin lưu ý: **không thay đổi các bản ghi email** (`mail`, `smtp`, `imap`, `pop3`, `MX`, `SPF`)
> để tránh ảnh hưởng đến hộp thư công ty.
>
> Sau khi lưu, anh/chị gửi lại giúp em ảnh chụp bảng DNS để em kiểm tra và xác nhận ạ.
> Trong 5–10 phút đầu website có thể chập chờn, sau đó sẽ ổn định.
>
> Em cảm ơn anh/chị.

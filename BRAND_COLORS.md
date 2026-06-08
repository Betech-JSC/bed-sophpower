# Bảng Màu Thương Hiệu (Brand Color Palette) - SOPHPOWER VIETNAM

Tài liệu này định nghĩa bảng màu thương hiệu chính thức được cấu hình trong mã nguồn dự án Sophpower Việt Nam thông qua Tailwind CSS v4. Việc chuẩn hóa này giúp duy trì tính nhất quán về mặt hình ảnh, cải thiện trải nghiệm người dùng (UX) và tránh lỗi tương phản thấp.

---

## 🟢 1. Tông Màu Xanh Lá Cây Chủ Đạo (Brand Green)

Màu xanh lá đại diện cho tự nhiên, nguyên liệu thảo mộc sạch (Pioneer Herb), sức sống và tính ổn định.

| Class Tailwind | Mã HEX | Vai trò & Sử dụng thực tế |
| :--- | :--- | :--- |
| `bg-brand-green`<br>`text-brand-green` | `#106d38` | **Màu Xanh Thương Hiệu Chính**. Dùng cho Header, nền nút CTA chính, tiêu đề trang, icon trên nền sáng. |
| `bg-brand-green-hover`<br>`text-brand-green-hover` | `#0a4f27` | **Hover Trên Nền Sáng**. Tông xanh đậm hơn dùng khi rê chuột (hover) vào nút/link xanh lá trên nền trắng/xám. |
| `bg-brand-green-light`<br>`text-brand-green-light` | `#10e660` | **Active & Hover Trên Nền Tối**. Tông xanh neon sáng dùng làm màu active (Header links) hoặc màu hover/icon khi nằm trong container nền tối (như hộp liên hệ). |
| `bg-brand-green-subtle`<br>`text-brand-green-subtle` | `#f0f7f3` | **Nền Phụ Trợ Nhạt**. Dùng làm nền cho thẻ sản phẩm, panel thông tin, hoặc đường viền trang trí nhẹ. |

---

## 🔵 2. Tông Màu Xanh Dương Phụ Trợ (Brand Blue)

Màu xanh dương đại diện cho tính chuyên nghiệp B2B, xuất nhập khẩu đa quốc gia, uy tín và sự tin cậy công nghiệp.

| Class Tailwind | Mã HEX | Vai trò & Sử dụng thực tế |
| :--- | :--- | :--- |
| `bg-brand-blue`<br>`text-brand-blue` | `#002962` | **Màu Xanh Dương Phụ Trợ B2B**. Dùng cho các tiêu đề phụ, nhãn thông số kỹ thuật, nút phụ. |
| `bg-brand-blue-hover`<br>`text-brand-blue-hover` | `#001f4c` | **Hover Xanh Dương**. Tông xanh dương đậm hơn dùng khi rê chuột vào các phần tử màu xanh dương. |
| `bg-brand-blue-subtle`<br>`text-brand-blue-subtle` | `#f0f4fa` | **Nền Kỹ Thuật Nhạt**. Tông xanh dương nhạt dùng làm nền bảng dữ liệu hoặc bảng thông số. |

---

## 📐 3. Quy Tắc Sử Dụng Màu Sắc Để Tránh Lỗi Thiết Kế (UX/UI Guideline)

Để đảm bảo khả năng tiếp cận (Accessibility - WCAG AA) và độ sắc nét trên mọi thiết bị:

1. **Nguyên tắc tương phản trên Nền Tối (Dark/Green Backgrounds)**:
   - ❌ **Không** sử dụng `text-brand-green` (`#106d38`) hoặc `hover:text-brand-green` trên nền `bg-brand-green` vì chữ sẽ bị chìm hoàn toàn.
   -  Sử dụng `text-white` hoặc `text-brand-green-light` (`#10e660`) để đảm bảo khả năng đọc tốt nhất.
2. **Trạng thái Active và Focus**:
   - Sử dụng `text-brand-green-light` cho các đường link trang hiện tại trên Header và các chỉ số hoạt động.
3. **Màu Tím Bị Cấm (Purple Ban)**:
   - ❌ Tuyệt đối **không** được đưa màu tím/violet (`#8b5cf6`, `#7c3aed`, v.v.) vào làm màu thương hiệu hoặc hiệu ứng neon cho web. Đối với sản phẩm đặc thù "Màu Tím Tự Nhiên" (Purple Pigment), sử dụng ảnh thực tế và tên gọi thuần túy, tránh lạm dụng màu sắc CSS tím.

---

## 🛠️ 4. Cấu Hợp Trong Mã Nguồn (`globals.css`)

Bảng màu này được định nghĩa trực tiếp trong `@theme inline` của Tailwind CSS v4 tại [globals.css](file:///d:/Vibe%20Coding/sophpower/web/src/app/globals.css):

```css
@theme inline {
  --color-brand-green: #106d38;
  --color-brand-green-hover: #0a4f27;
  --color-brand-green-light: #10e660;
  --color-brand-green-subtle: #f0f7f3;
  --color-brand-blue: #002962;
  --color-brand-blue-hover: #001f4c;
  --color-brand-blue-light: #3b82f6;
  --color-brand-blue-subtle: #f0f4fa;
}
```

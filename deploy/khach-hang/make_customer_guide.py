#!/usr/bin/env python3
"""
Sinh file .docx hướng dẫn trỏ tên miền để gửi khách hàng.

Cách dùng (điền thông tin thật, không để placeholder):
    python3 make_customer_guide.py \
        --company "Công ty TNHH Công nghiệp Sophpower Việt Nam" \
        --domain "sophchem.vn" \
        --ip "103.1.2.51" \
        --date "16/11/2026" \
        --tech "Nguyễn Văn A" --phone "0900 000 000" --email "a@betech.vn"

Nếu bỏ trống tham số nào, file sinh ra sẽ giữ placeholder dạng <TÊN_MIỀN> để điền tay.
"""
import argparse
from pathlib import Path

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

GREEN = "106D38"      # màu thương hiệu
GREY = "5B6570"
AMBER_DARK = "92400E"
AMBER_BG = "FEF3C7"
LIGHT_BG = "F3F6F4"

FONT = "Arial"


# --------------------------------------------------------------------------
# helpers
# --------------------------------------------------------------------------
def shade(cell, hex_fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_fill)
    tc_pr.append(shd)


def cell_text(cell, text, bold=False, size=10, color=None, align=None, mono=False):
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    if align is not None:
        p.alignment = align
    run = p.add_run(text)
    run.bold = bold
    run.font.size = Pt(size)
    run.font.name = "Courier New" if mono else FONT
    run._element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
    if color:
        run.font.color.rgb = RGBColor.from_string(color)


def para(doc, text, size=10.5, bold=False, color=None, space_after=6,
         align=None, italic=False, style=None):
    p = doc.add_paragraph(style=style) if style else doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    if align is not None:
        p.alignment = align
    run = p.add_run(text)
    run.bold = bold
    run.italic = italic
    run.font.size = Pt(size)
    run.font.name = FONT
    if color:
        run.font.color.rgb = RGBColor.from_string(color)
    return p


def rich_para(doc, chunks, size=10.5, space_after=6, style=None):
    """chunks: list of (text, bold)"""
    p = doc.add_paragraph(style=style) if style else doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    for text, bold in chunks:
        run = p.add_run(text)
        run.bold = bold
        run.font.size = Pt(size)
        run.font.name = FONT
    return p


def heading(doc, text, size=13, space_before=12):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(6)
    run = p.add_run(text)
    run.bold = True
    run.font.size = Pt(size)
    run.font.name = FONT
    run.font.color.rgb = RGBColor.from_string(GREEN)
    # gạch chân mảnh dưới heading
    p_pr = p._p.get_or_add_pPr()
    borders = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "2")
    bottom.set(qn("w:color"), "D7E3D9")
    borders.append(bottom)
    p_pr.append(borders)
    return p


def make_table(doc, headers, rows, widths, header_fill=GREEN, mono_cols=(),
               col_align=None):
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    table.autofit = False
    tbl_pr = table._tbl.tblPr
    layout = OxmlElement("w:tblLayout")
    layout.set(qn("w:type"), "fixed")
    tbl_pr.append(layout)

    hdr = table.rows[0].cells
    for i, h in enumerate(headers):
        cell_text(hdr[i], h, bold=True, size=9.5, color="FFFFFF",
                  align=WD_ALIGN_PARAGRAPH.CENTER)
        shade(hdr[i], header_fill)

    for row in rows:
        cells = table.add_row().cells
        for i, value in enumerate(row):
            align = None
            if col_align and i < len(col_align):
                align = col_align[i]
            cell_text(cells[i], value, size=9.5,
                      align=align, mono=(i in mono_cols))

    for i, w in enumerate(widths):
        table.columns[i].width = Cm(w)
    for row in table.rows:
        for i, w in enumerate(widths):
            row.cells[i].width = Cm(w)
    return table


def box(doc, lines, fill=AMBER_BG, border=AMBER_DARK, size=10):
    table = doc.add_table(rows=1, cols=1)
    table.style = "Table Grid"
    table.autofit = False
    cell = table.rows[0].cells[0]
    cell.width = Cm(17)
    shade(cell, fill)
    cell.text = ""
    first = True
    for text, bold in lines:
        p = cell.paragraphs[0] if first else cell.add_paragraph()
        first = False
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(text)
        run.bold = bold
        run.font.size = Pt(size)
        run.font.name = FONT
        run.font.color.rgb = RGBColor.from_string(border)
    return table


def add_page_number(paragraph):
    run = paragraph.add_run()
    fld_begin = OxmlElement("w:fldChar")
    fld_begin.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = " PAGE "
    fld_sep = OxmlElement("w:fldChar")
    fld_sep.set(qn("w:fldCharType"), "separate")
    txt = OxmlElement("w:t")
    txt.text = "1"
    fld_end = OxmlElement("w:fldChar")
    fld_end.set(qn("w:fldCharType"), "end")
    for node in (fld_begin, instr, fld_sep, txt, fld_end):
        run._r.append(node)
    run.font.size = Pt(8.5)
    run.font.name = FONT


# --------------------------------------------------------------------------
# document
# --------------------------------------------------------------------------
def build(args, out_path: Path):
    doc = Document()

    # style mặc định
    normal = doc.styles["Normal"]
    normal.font.name = FONT
    normal.font.size = Pt(10.5)
    normal.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    normal.element.rPr.rFonts.set(qn("w:eastAsia"), FONT)

    for section in doc.sections:
        section.top_margin = Cm(1.9)
        section.bottom_margin = Cm(1.7)
        section.left_margin = Cm(2.0)
        section.right_margin = Cm(2.0)

    # footer
    footer_p = doc.sections[0].footer.paragraphs[0]
    footer_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    fr = footer_p.add_run("Hướng dẫn trỏ tên miền  ·  " + args.domain + "  ·  Trang ")
    fr.font.size = Pt(8.5)
    fr.font.name = FONT
    fr.font.color.rgb = RGBColor.from_string(GREY)
    add_page_number(footer_p)

    # ---- tiêu đề
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run("TÀI LIỆU BÀN GIAO KỸ THUẬT")
    r.bold = True
    r.font.size = Pt(9)
    r.font.name = FONT
    r.font.color.rgb = RGBColor.from_string(GREY)

    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run("HƯỚNG DẪN CHUYỂN WEBSITE SANG MÁY CHỦ MỚI")
    r.bold = True
    r.font.size = Pt(17)
    r.font.name = FONT
    r.font.color.rgb = RGBColor.from_string(GREEN)

    para(doc, "Dành cho bộ phận IT / người quản lý tên miền của Quý công ty.",
         size=10, color=GREY, space_after=10)

    make_table(
        doc,
        ["Tên miền áp dụng", "Áp dụng cho", "Thời gian", "Ngày ban hành"],
        [[args.domain, args.company, "Khoảng 10 phút", args.date]],
        widths=[4.2, 6.2, 3.4, 3.2],
        col_align=[WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT,
                   WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER],
    )

    # ---- mục đích
    heading(doc, "MỤC ĐÍCH")
    para(doc,
         "Website của Quý công ty đã được chuyển sang máy chủ mới đặt tại Việt Nam "
         "(tốc độ nhanh hơn và ổn định hơn cho người truy cập trong nước). Để website "
         "hiển thị từ máy chủ mới, Quý công ty chỉ cần cập nhật 02 bản ghi DNS và thêm "
         "01 bản ghi theo bảng ở Mục 1. Không cần cài đặt lại, không cần nhập lại dữ liệu.")
    box(doc, [
        ("Sau khi cập nhật: website vẫn là website hiện tại, toàn bộ dữ liệu được giữ nguyên.", True),
        ("Email doanh nghiệp KHÔNG bị ảnh hưởng, miễn là giữ nguyên các bản ghi ở Mục 2.", False),
    ])

    # ---- mục 1
    heading(doc, "1. BA BẢN GHI CẦN CẬP NHẬT")
    make_table(
        doc,
        ["STT", "Loại (Type)", "Tên (Host)", "Giá trị mới (Value)", "Thay cho giá trị cũ"],
        [
            ["1", "A", "@", args.ip, "216.198.79.1"],
            ["2", "CNAME", "www", args.domain, "vercel-dns-017.com"],
            ["3", "A", "api", args.ip, "(thêm mới nếu chưa có)"],
        ],
        widths=[1.3, 2.6, 2.6, 5.2, 5.3],
        mono_cols=(3,),
        col_align=[WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER,
                   WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT,
                   WD_ALIGN_PARAGRAPH.LEFT],
    )
    para(doc, "TTL: 600 (10 phút) cho cả ba bản ghi.", size=9.5, color=GREY, space_after=2)
    para(doc, "Nếu bản ghi \"api\" đã tồn tại: chỉ cần kiểm tra giá trị đúng " + args.ip +
         ", không tạo thêm bản ghi trùng.", size=9.5, color=GREY, space_after=2)

    # ---- mục 2
    heading(doc, "2. CÁC BẢN GHI TUYỆT ĐỐI KHÔNG XOÁ HOẶC SỬA")
    para(doc,
         "Đây là cấu hình email doanh nghiệp Aliyun đang hoạt động. Xoá hoặc sửa các bản ghi "
         "này sẽ làm toàn bộ email của công ty ngừng nhận và ngừng gửi (dù website vẫn chạy).",
         size=10)
    make_table(
        doc,
        ["Loại", "Tên", "Giá trị", "Vai trò"],
        [
            ["CNAME", "mail", "mail.qiye.aliyun.com", "Truy cập webmail"],
            ["CNAME", "smtp", "smtp.qiye.aliyun.com", "Gửi email"],
            ["CNAME", "imap", "imap.qiye.aliyun.com", "Đồng bộ email (IMAP)"],
            ["CNAME", "pop3", "pop3.qiye.aliyun.com", "Đồng bộ email (POP3)"],
            ["MX", "@", "mx1 / mx2 / mx3.qiye.aliyun.com", "Nhận email"],
            ["TXT", "@", "v=spf1 include:spf.qiye.aliyun.com -all", "Chống giả mạo email (SPF)"],
        ],
        widths=[2.2, 2.0, 8.4, 4.4],
        mono_cols=(2,),
        col_align=[WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER,
                   WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT],
    )
    para(doc, "Chỉ sửa đúng 3 bản ghi ở Mục 1. Mọi bản ghi khác giữ nguyên.",
         size=10, bold=True, color=AMBER_DARK, space_after=4)

    # ---- mục 3
    heading(doc, "3. CÁC BƯỚC THỰC HIỆN (TRÊN TRANG QUẢN TRỊ DNS ALIYUN)")
    steps = [
        "Đăng nhập https://dns.console.aliyun.com bằng tài khoản đang quản lý tên miền " + args.domain + ".",
        "Chọn tên miền " + args.domain + " trong danh sách.",
        "Tìm bản ghi @  ·  loại A  →  bấm Sửa (Edit)  →  thay giá trị thành " + args.ip +
        "  →  TTL 600  →  Lưu.",
        "Tìm bản ghi www  ·  loại CNAME  →  bấm Sửa  →  thay giá trị thành " + args.domain +
        "  →  TTL 600  →  Lưu.",
        "Nếu chưa có bản ghi api: bấm Thêm bản ghi (Add Record)  →  loại A, tên api, giá trị " +
        args.ip + ", TTL 600  →  Lưu.",
        "Không thay đổi bất kỳ bản ghi nào khác.",
    ]
    for s in steps:
        para(doc, s, size=10.5, space_after=3, style="List Number")

    # ---- mục 4
    heading(doc, "4. THỜI GIAN VÀ NHỮNG GÌ SẼ XẢY RA")
    make_table(
        doc,
        ["Thời điểm", "Hiện tượng"],
        [
            ["Ngay sau khi lưu", "Bản ghi mới bắt đầu có hiệu lực"],
            ["5 – 10 phút tiếp theo",
             "Website lan truyền dần sang máy chủ mới. Người này có thể thấy bản mới, "
             "người khác vẫn thấy bản cũ"],
            ["1 – 2 phút đầu",
             "Trình duyệt có thể báo \"Kết nối không bảo mật\" / lỗi chứng chỉ — hiện tượng "
             "bình thường khi chứng chỉ HTTPS đang được cấp cho máy chủ mới. Chờ 2 phút rồi tải lại"],
            ["Sau 10 – 30 phút", "Ổn định hoàn toàn trên toàn quốc"],
        ],
        widths=[5.2, 11.8],
        col_align=[WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT],
    )
    para(doc, "Không cần tắt website cũ và không cần thông báo cho khách hàng của Quý công ty.",
         size=9.5, color=GREY, space_after=2)

    # ---- mục 5
    heading(doc, "5. CÁCH KIỂM TRA SAU KHI CẬP NHẬT")
    for s in [
        "Mở trình duyệt ở chế độ ẩn danh (Incognito), truy cập https://" + args.domain + ".",
        "Kiểm tra lan truyền DNS tại https://dnschecker.org (nhập " + args.domain + ", chọn A).",
        "Nếu vẫn thấy nội dung cũ: xoá cache DNS trên máy hoặc thử bằng 4G thay vì wifi.",
    ]:
        para(doc, s, size=10.5, space_after=3, style="List Bullet")

    # ---- mục 6
    heading(doc, "6. XÁC NHẬN HOÀN TẤT")
    para(doc, "Sau khi lưu, Quý công ty vui lòng gửi lại cho chúng tôi:", size=10.5, space_after=3)
    for s in [
        "Ảnh chụp màn hình bảng DNS sau khi cập nhật;",
        "Thời điểm thực hiện.",
    ]:
        para(doc, s, size=10.5, space_after=3, style="List Bullet")
    para(doc, "Chúng tôi sẽ kiểm tra và xác nhận website đã chạy trên máy chủ mới.",
         size=10.5, space_after=4)

    # ---- mục 7
    heading(doc, "7. CÂU HỎI THƯỜNG GẶP")
    faqs = [
        ("Có phải làm lại website hoặc nhập lại dữ liệu không?",
         "Không. Toàn bộ dữ liệu đã được chuyển sẵn, chỉ cần trỏ tên miền."),
        ("Email công ty có bị ảnh hưởng không?",
         "Không, nếu giữ nguyên các bản ghi ở Mục 2."),
        ("Website có bị gián đoạn không?",
         "Chỉ khoảng 1 – 2 phút trong lúc chuyển, và có thể chỉ một số người dùng gặp do DNS lan truyền."),
        ("Có cần thay đổi Google Analytics / Search Console / Zalo OA không?",
         "Không. Tên miền giữ nguyên nên mọi cấu hình cũ vẫn đúng."),
        ("Nếu cần quay lại phương án cũ thì sao?",
         "Vui lòng liên hệ chúng tôi. Bản ghi cũ được lưu ở Phụ lục A và có thể khôi phục trong vài phút."),
    ]
    for q, a in faqs:
        rich_para(doc, [(q, True)], size=10.5, space_after=1)
        para(doc, a, size=10.5, color=GREY, space_after=8)

    # ---- mục 8
    heading(doc, "8. LIÊN HỆ HỖ TRỢ")
    make_table(
        doc,
        ["Phụ trách kỹ thuật", "Điện thoại / Zalo", "Email"],
        [[args.tech, args.phone, args.email]],
        widths=[6.0, 5.5, 5.5],
        col_align=[WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER,
                   WD_ALIGN_PARAGRAPH.LEFT],
    )

    # ---- phụ lục A
    doc.add_page_break()
    heading(doc, "PHỤ LỤC A — THÔNG TIN KỸ THUẬT (DÀNH CHO BỘ PHẬN IT)")
    make_table(
        doc,
        ["Bản ghi", "Trước khi chuyển", "Sau khi chuyển"],
        [
            ["A  @", "216.198.79.1", args.ip],
            ["CNAME  www", "vercel-dns-017.com", args.domain],
            ["A  api", "(không có)", args.ip],
        ],
        widths=[4.2, 6.4, 6.4],
        mono_cols=(1, 2),
        col_align=[WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT,
                   WD_ALIGN_PARAGRAPH.LEFT],
    )
    para(doc, "Website: https://" + args.domain + "  (Next.js, máy chủ " + args.ip +
         ", Nginx + HTTPS Let's Encrypt).", size=9.5, color=GREY, space_after=2)
    para(doc, "Trang quản trị: https://api." + args.domain + "/admin (tài khoản cấp riêng).",
         size=9.5, color=GREY, space_after=2)
    para(doc, "Khôi phục phương án cũ: trả A @ về 216.198.79.1 và CNAME www về vercel-dns-017.com, chờ 10 phút.",
         size=9.5, color=GREY, space_after=2)

    # ---- phụ lục B
    heading(doc, "PHỤ LỤC B — MẪU TIN NHẮN GỬI KÈM TÀI LIỆU")
    box(doc, [
        ("Kính gửi anh/chị " + args.tech + ",", False),
        ("", False),
        ("Bên em đã hoàn tất phần máy chủ mới cho website " + args.domain + ". Nhờ anh/chị "
         "cập nhật giúp 3 bản ghi DNS theo tài liệu đính kèm (Mục 1) — chỉ mất khoảng 10 phút.", False),
        ("", False),
        ("Xin lưu ý: không thay đổi các bản ghi email (mail, smtp, imap, pop3, MX, SPF) để tránh "
         "ảnh hưởng đến hộp thư công ty.", False),
        ("", False),
        ("Sau khi lưu, anh/chị gửi lại giúp em ảnh chụp bảng DNS để em kiểm tra và xác nhận ạ. "
         "Trong 5–10 phút đầu website có thể chập chờn, sau đó sẽ ổn định.", False),
        ("", False),
        ("Em cảm ơn anh/chị.", False),
    ], fill=LIGHT_BG, border=GREY)

    doc.core_properties.title = "Hướng dẫn chuyển website sang máy chủ mới"
    doc.core_properties.subject = "Cập nhật bản ghi DNS cho " + args.domain
    doc.core_properties.author = args.tech
    doc.save(str(out_path))
    return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--company", default="<TÊN_CÔNG_TY>")
    ap.add_argument("--domain", default="<TÊN_MIỀN>")
    ap.add_argument("--ip", default="<IP_VPS>")
    ap.add_argument("--date", default="<dd/mm/yyyy>")
    ap.add_argument("--tech", default="<HỌ_TÊN>")
    ap.add_argument("--phone", default="<SỐ_ĐIỆN_THOẠI>")
    ap.add_argument("--email", default="<EMAIL>")
    ap.add_argument("--out", default=str(Path(__file__).with_name("HUONG-DAN-TRO-TEN-MIEN.docx")))
    args = ap.parse_args()

    out = build(args, Path(args.out))
    print(out)


if __name__ == "__main__":
    main()

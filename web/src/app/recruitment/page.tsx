import React from "react";
import Link from "next/link";
import { Briefcase, MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  deadline: string;
  summary: string;
}

export default function Recruitment() {
  const jobs: Job[] = [
    {
      id: "sales-chemical",
      title: "Nhân Viên Kinh Doanh - Mảng Nguyên Liệu Mỹ Phẩm & Thực Phẩm",
      department: "Phòng Kinh Doanh (Sales)",
      location: "TP. Hồ Chí Minh",
      salary: "Thỏa thuận (Lương cứng + Hoa hồng)",
      deadline: "2026-07-15",
      summary: "Tìm kiếm đối tác khách hàng, phân phối các dòng nguyên liệu chất tạo màu, vitamin B3, B5, hương liệu nhập khẩu cho các cơ sở sản xuất chế biến thực phẩm và nhà máy gia công mỹ phẩm.",
    },
    {
      id: "rd-specialist",
      title: "Chuyên Viên Nghiên Cứu Phát Triển Sản Phẩm (R&D)",
      department: "Phòng R&D",
      location: "TP. Hồ Chí Minh",
      salary: "Cạnh tranh",
      deadline: "2026-07-30",
      summary: "Hỗ trợ kỹ thuật ứng dụng nguyên liệu khó tan, nhũ tương và chất ổn định làm dày cho hệ đồ uống và thực phẩm của các đối tác sản xuất.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/about-ban.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-950/60" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
            RECRUITMENT
          </h1>
          <div className="h-1 w-16 bg-brand-green mx-auto mt-4" />
        </div>
      </section>

      {/* Main Listing */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
              CƠ HỘI NGHỀ NGHIỆP
            </h2>
            <div className="h-0.5 w-16 bg-brand-green mx-auto" />
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Gia nhập đội ngũ Sophpower Việt Nam để cùng phát triển chuỗi cung ứng nguyên liệu công nghiệp & hóa chất hàng đầu.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/recruitment/${job.id}`}
                className="group block rounded-2xl bg-white border border-gray-150 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-brand-green uppercase tracking-wide">
                      {job.department}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
                      {job.title}
                    </h3>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 group-hover:text-brand-green uppercase tracking-wide transition-colors shrink-0"
                  >
                    CHI TIẾT
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed">{job.summary}</p>

                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand-green" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-brand-green" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-brand-green" />
                    Full-time
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-brand-green" />
                    Hạn: {job.deadline}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

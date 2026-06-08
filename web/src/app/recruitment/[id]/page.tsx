import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, DollarSign, Briefcase, Mail } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  deadline: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

const jobsData: Record<string, Job> = {
  "sales-chemical": {
    id: "sales-chemical",
    title: "Nhân Viên Kinh Doanh - Mảng Nguyên Liệu Mỹ Phẩm & Thực Phẩm",
    department: "Phòng Kinh Doanh (Sales)",
    location: "TP. Hồ Chí Minh",
    salary: "Thỏa thuận (Lương cứng + Hoa hồng)",
    deadline: "2026-07-15",
    responsibilities: [
      "Tìm kiếm, khai thác khách hàng và đối tác sản xuất có nhu cầu về nguyên liệu thực phẩm (chất tạo màu, hương liệu, ổn định) và mỹ phẩm (Niacinamide, B5, Tranexamic).",
      "Tiếp cận và tư vấn kỹ thuật sản phẩm, báo giá, đàm phán hợp đồng cung ứng.",
      "Chăm sóc và duy trì mối quan hệ tốt đẹp lâu dài với khách hàng hiện hữu.",
      "Phối hợp với bộ phận kỹ thuật R&D để giải quyết các vướng mắc ứng dụng của khách hàng.",
    ],
    requirements: [
      "Tốt nghiệp Cao đẳng/Đại học ngành Hóa học, Công nghệ thực phẩm, Công nghệ sinh học hoặc Quản trị kinh doanh.",
      "Có tối thiểu 1 năm kinh nghiệm kinh doanh B2B nguyên liệu thực phẩm, nguyên liệu hóa mỹ phẩm hoặc các ngành liên quan.",
      "Khả năng giao tiếp tốt, tự tin thuyết phục và đàm phán thương mại.",
      "Chủ động trong công việc, có tinh thần cầu tiến.",
    ],
    benefits: [
      "Thu nhập hấp dẫn: Lương cơ bản cạnh tranh + Hoa hồng doanh số vượt trội.",
      "Được đào tạo bài bản về kiến thức kỹ thuật sản phẩm nguyên liệu từ các chuyên gia.",
      "Thưởng quý, thưởng năm theo kết quả kinh doanh và chính sách công ty.",
      "Hưởng đầy đủ bảo hiểm xã hội, y tế theo quy định pháp luật.",
    ],
  },
  "rd-specialist": {
    id: "rd-specialist",
    title: "Chuyên Viên Nghiên Cứu Phát Triển Sản Phẩm (R&D)",
    department: "Phòng R&D",
    location: "TP. Hồ Chí Minh",
    salary: "Cạnh tranh",
    deadline: "2026-07-30",
    responsibilities: [
      "Nghiên cứu ứng dụng và cải tiến công thức sản phẩm sử dụng nguyên liệu của công ty (chất làm dày, nhũ tương carotene, chất ổn định nước quả).",
      "Hỗ trợ kỹ thuật thực nghiệm công thức tại phòng thí nghiệm của công ty và chuyển giao cho nhà máy của khách hàng.",
      "Đánh giá cảm quan, kiểm tra độ ổn định của mẫu thử nghiệm.",
      "Viết tài liệu hướng dẫn kỹ thuật ứng dụng sản phẩm.",
    ],
    requirements: [
      "Tốt nghiệp Đại học chuyên ngành Công nghệ thực phẩm, Hóa học thực phẩm, Công nghệ sinh học.",
      "Có ít nhất 2 năm kinh nghiệm làm R&D trong các công ty chế biến sữa, nước giải khát, nước sốt hoặc phụ gia thực phẩm.",
      "Có hiểu biết tốt về chất làm đầy, gum ổn định và hoạt động nhũ hóa.",
      "Kỹ năng làm việc độc lập và quản lý dự án thí nghiệm tốt.",
    ],
    benefits: [
      "Lương cứng cạnh tranh theo năng lực chuyên môn.",
      "Cơ hội làm việc trực tiếp với các dây chuyền và chuyên gia siêu phân tử tiên tiến.",
      "Môi trường phòng lab hiện đại, tiện nghi.",
      "Tham gia các khóa đào tạo chuyên sâu trong nước và quốc tế.",
    ],
  },
};

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = jobsData[id];

  if (!job) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-3 py-12 sm:px-4 lg:px-6">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/recruitment"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại cơ hội nghề nghiệp
        </Link>
      </div>

      <div className="rounded-2xl bg-white border border-gray-150 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wide">
            {job.department}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {job.title}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-100 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4.5 w-4.5 text-brand-green shrink-0" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-4.5 w-4.5 text-brand-green shrink-0" />
            {job.salary}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-4.5 w-4.5 text-brand-green shrink-0" />
            Full-time
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4.5 w-4.5 text-brand-green shrink-0" />
            Hạn nộp: {job.deadline}
          </span>
        </div>

        {/* Responsibilities */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-l-3 border-brand-green pl-3">
            MÔ TẢ CÔNG VIỆC
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-650">
            {job.responsibilities.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-l-3 border-brand-green pl-3">
            YÊU CẦU CÔNG VIỆC
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-650">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-l-3 border-brand-green pl-3">
            QUYỀN LỢI ĐƯỢC HƯỞNG
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-650">
            {job.benefits.map((bene, i) => (
              <li key={i}>{bene}</li>
            ))}
          </ul>
        </div>

        {/* Application details */}
        <div className="rounded-xl bg-brand-green/5 p-6 border border-brand-green/20 space-y-3">
          <h4 className="font-bold text-brand-green text-sm">Hướng dẫn nộp hồ sơ:</h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Ứng viên quan tâm vui lòng gửi CV ứng tuyển kèm tiêu đề <strong>[Họ tên - Vị trí ứng tuyển]</strong> về địa chỉ email của bộ phận tuyển dụng:
          </p>
          <div className="flex items-center gap-2 text-brand-green font-bold text-sm sm:text-base pt-1">
            <Mail className="h-5 w-5 shrink-0" />
            <a href="mailto:vnsp4@sophpower.com" className="hover:underline">
              vnsp4@sophpower.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

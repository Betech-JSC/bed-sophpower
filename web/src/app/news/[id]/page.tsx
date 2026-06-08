import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

interface Article {
  id: string;
  title: string;
  date: string;
  source: string;
  image: string;
  paragraphs: string[];
}

const articlesData: Record<string, Article> = {
  "1": {
    id: "1",
    title: "Xu Hướng Mỹ Phẩm Thiên Nhiên 2026 – Vì Sao Rosa Damascena Flower Water Được Ưa Chuộng Trong Các Dòng Skincare Hiện Đại?",
    date: "2026-06-08",
    source: "Sophpower R&D",
    image: "/images/news/news1.png",
    paragraphs: [
      "Năm 2026, xu hướng làm đẹp tại Việt Nam đang thay đổi rõ rệt khi người tiêu dùng ngày càng ưu tiên các sản phẩm có nguồn gốc tự nhiên và mang lại cảm giác dịu nhẹ cho da. Thay vì lựa chọn các sản phẩm có công thức quá phức tạp, nhiều người hiện nay hướng đến skincare tối giản, lành tính và phù hợp sử dụng lâu dài.",
      "Điều này thúc đẩy ngành mỹ phẩm phát triển mạnh các dòng sản phẩm có chiết xuất thực vật, nước chưng cất hoa tự nhiên và thành phần chăm sóc da có nguồn gốc botanical.",
      "Không chỉ hiệu quả, trải nghiệm sử dụng cũng đang trở thành yếu tố quan trọng trong quyết định mua hàng. Người tiêu dùng hiện nay yêu thích những sản phẩm mang lại cảm giác thư giãn, có hương thơm tự nhiên nhẹ nhàng, giúp da cảm thấy dễ chịu khi sử dụng. Đặc biệt, các dòng toner, mist và skincare cấp ẩm từ hoa tự nhiên đang ngày càng được ưa chuộng trên thị trường mỹ phẩm hiện đại.",
      "Trong xu hướng đó, Rosa Damascena Flower Water (Nước hoa hồng Damask) đang trở thành thành phần nổi bật trong nhiều sản phẩm chăm sóc da hiện nay. Chiết xuất từ hoa hồng Damask nổi tiếng với hương thơm tự nhiên thanh nhẹ và khả năng mang lại cảm giác thư giãn tuyệt vời cho làn da, được ứng dụng rộng rãi trong toner, facial mist, serum, cream dưỡng da và các dòng skincare thiên nhiên.",
      "Nhờ hình ảnh cao cấp và cảm giác sử dụng dễ chịu, Nước hoa hồng Damask giúp sản phẩm trở nên hấp dẫn hơn đối với nhóm khách hàng yêu thích mỹ phẩm thiên nhiên. Xu hướng này thúc đẩy các thương hiệu mỹ phẩm tập trung vào các thành phần botanical nhằm tạo sự khác biệt và nâng cao giá trị sản phẩm trên thị trường."
    ]
  },
  "2": {
    id: "2",
    title: "Vì Sao Tranexamic Acid Được Nhiều Thương Hiệu Skincare Ứng Dụng Trong Mỹ Phẩm Hiện Đại?",
    date: "2026-06-07",
    source: "Sophpower Lab",
    image: "/images/products/tranexamic-acid.jpg",
    paragraphs: [
      "Ngành mỹ phẩm hiện nay không còn chỉ tập trung vào các sản phẩm chăm sóc da cơ bản mà đang phát triển theo hướng chuyên sâu và cá nhân hóa trải nghiệm người dùng. Người tiêu dùng hiện đại ngày càng quan tâm đến bảng thành phần, kết cấu sản phẩm và cảm giác khi sử dụng skincare mỗi ngày.",
      "Điều này thúc đẩy các thương hiệu mỹ phẩm liên tục nghiên cứu những thành phần hoạt chất chuyên sâu, lành tính và dễ ứng dụng trong nhiều dòng sản phẩm khác nhau.",
      "Hiện nay, người dùng skincare có xu hướng tìm hiểu kỹ thành phần trước khi lựa chọn sản phẩm. Các sản phẩm sở hữu công thức hiện đại, tối giản và mang hình ảnh khoa học thường được đánh giá cao hơn trên thị trường. Bên cạnh đó, những thành phần có khả năng kết hợp linh hoạt trong nhiều công thức skincare cũng ngày càng được nhiều thương hiệu ưu tiên sử dụng.",
      "Trong bối cảnh đó, Tranexamic Acid đang trở thành thành phần được nhiều thương hiệu mỹ phẩm ứng dụng rộng rãi trong các dòng skincare hiện đại. Hoạt chất này thường xuất hiện trong các sản phẩm serum dưỡng da, toner, cream dưỡng, essence và các dòng mỹ phẩm chăm sóc da chuyên sâu nhờ cơ chế làm sáng da, mờ thâm nám và tàn nhang hiệu quả.",
      "Nhờ khả năng phù hợp với nhiều loại công thức khác nhau, Tranexamic Acid ngày càng được sử dụng rộng rãi trong cả phân khúc phổ thông lẫn cao cấp, giúp các thương hiệu skincare nâng cao giá trị sản phẩm và đáp ứng nhu cầu chăm sóc da khoa học của khách hàng."
    ]
  },
  "3": {
    id: "3",
    title: "Thị Trường Mỹ Phẩm Việt Nam Đang Thay Đổi Theo Xu Hướng Nào?",
    date: "2026-06-05",
    source: "Sophpower Lab",
    image: "/images/products/niacinamide.jpg",
    paragraphs: [
      "Trong những năm gần đây, thị trường mỹ phẩm Việt Nam đang phát triển nhanh chóng cùng với sự thay đổi rõ rệt trong thói quen tiêu dùng của khách hàng. Người tiêu dùng hiện đại không chỉ quan tâm đến giá thành hay thương hiệu mà còn chú trọng hơn đến thành phần, trải nghiệm sử dụng và hiệu quả chăm sóc da lâu dài.",
      "Hiện nay, người tiêu dùng Việt Nam có xu hướng tìm hiểu kỹ hơn về bảng thành phần trước khi lựa chọn sản phẩm skincare. Các ingredient như Niacinamide, Hyaluronic Acid, Ceramide, Tranexamic Acid và chiết xuất thực vật dịu nhẹ, hạn chế gây kích ứng đang trở thành xu hướng chọn lựa hàng đầu.",
      "Xu hướng sử dụng mỹ phẩm thiên nhiên tiếp tục phát triển mạnh tại Việt Nam. Người tiêu dùng hiện nay ưu tiên các sản phẩm có nguồn gốc rõ ràng, thành phần thiên nhiên và công thức đơn giản hơn trước. Bên cạnh đó, 'clean beauty' cũng trở thành xu hướng được nhiều thương hiệu mỹ phẩm theo đuổi nhằm đáp ứng nhu cầu ngày càng cao.",
      "Khác với trước đây, người tiêu dùng hiện không còn quá chú trọng vào các bước skincare phức tạp. Thay vào đó, xu hướng hiện nay là lựa chọn các sản phẩm có hiệu quả rõ ràng, dễ sử dụng và tích hợp đa chức năng như dưỡng ẩm, làm sáng da, phục hồi da và chống oxy hóa.",
      "Ngoài hiệu quả chăm sóc da, người tiêu dùng cũng quan tâm nhiều hơn đến kết cấu sản phẩm, cảm giác trên da và mùi hương khi sử dụng. Những sản phẩm có texture nhẹ, dễ thẩm thấu và mang lại cảm giác dễ chịu luôn được ưu tiên lựa chọn trên kệ hàng."
    ]
  },
  "4": {
    id: "4",
    title: "Xu Hướng Nước Trái Cây Tại Việt Nam 2026 – Vì Sao Độ Ổn Định Sản Phẩm Ngày Càng Quan Trọng?",
    date: "2026-06-02",
    source: "Sophpower F&B",
    image: "/images/products/juice-stabilizer.jpg",
    paragraphs: [
      "Năm 2026, thị trường đồ uống tại Việt Nam tiếp tục phát triển mạnh mẽ, đặc biệt là các dòng nước trái cây và đồ uống có nguồn gốc tự nhiên. Người tiêu dùng hiện nay không chỉ quan tâm đến hương vị mà còn chú trọng đến chất lượng tổng thể của sản phẩm như màu sắc, kết cấu và trải nghiệm khi sử dụng.",
      "Xu hướng lựa chọn đồ uống lành mạnh đang thúc đẩy nhiều thương hiệu đổi mới công thức và nâng cao chất lượng cảm quan. Người tiêu dùng thường ưu tiên những sản phẩm có màu sắc đồng đều, texture tự nhiên, cảm giác uống mượt và trạng thái ổn định khi bảo quản. Ngược lại, các hiện tượng như tách lớp, lắng cặn hoặc phân tầng dễ khiến sản phẩm mất tính thẩm mỹ.",
      "Đối với các dòng nước trái cây hiện đại, đặc biệt là sản phẩm chứa tép thịt quả hoặc hàm lượng nước quả cao, việc duy trì trạng thái ổn định là một thách thức lớn trong quá trình sản xuất, lưu kho và vận chuyển.",
      "Đây cũng là lý do nhiều doanh nghiệp F&B hiện nay đã ứng dụng Hệ ổn định nước trái cây (Compound Juice Stabilizer) vào quá trình sản xuất. Giải pháp này giúp hạn chế hiện tượng tách lớp, giảm lắng cặn, duy trì trạng thái đồng nhất và cải thiện đáng kể mouthfeel (cảm giác uống) trong miệng.",
      "Trong tương lai, Hệ ổn định nước trái cây sẽ tiếp tục đóng vai trò quan trọng trong ngành nước trái cây hiện đại, góp phần giúp doanh nghiệp cải thiện hình thức chuyên nghiệp của sản phẩm trên các quầy kệ bán lẻ và đáp ứng kỳ vọng ngày càng cao của thị trường."
    ]
  }
};

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articlesData[id];

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-3 py-12 sm:px-4 lg:px-6">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại Trung tâm tin tức
        </Link>
      </div>

      {/* Article Container */}
      <article className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand-green" />
              {article.date}
            </span>
          </div>
        </div>

        <div className="h-0.5 w-full bg-gray-100 relative">
          <div className="absolute left-0 top-0 h-full w-24 bg-brand-green" />
        </div>

        {/* Feature Image */}
        <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-150">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto object-cover max-h-[450px]"
          />
        </div>

        {/* Article content */}
        <div className="space-y-6 text-gray-750 text-base leading-relaxed text-justify">
          {article.paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

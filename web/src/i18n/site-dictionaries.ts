import type { Locale } from "./locale-shared";

export type SiteDictionary = {
  common: {
    loading: string;
    scrollToTop: string;
  };
  header: {
    about: string;
    foodIngredients: string;
    cosmeticIngredients: string;
    news: string;
    contact: string;
    searchTitle: string;
    searchPlaceholder: string;
    searchButton: string;
    searchSearching: string;
    searchNoResults: string;
    searchTryOther: string;
    searchProducts: string;
    searchFood: string;
    searchCosmetic: string;
    searchNews: string;
    searchPopularKeywords: string;
    searchSuggestedProducts: string;
  };
  footer: {
    products: string;
    foodIngredients: string;
    cosmeticIngredients: string;
    aboutUs: string;
    newsEvents: string;
    careers: string;
    contactTitle: string;
    contactSub: string;
    emailPlaceholder: string;
    contactZalo: string;
    hotline: string;
    copyright: string;
    description: string;
    emailSuccess: string;
    address: string;
    emailSubmitAria: string;
  };
  recruitment: {
    title: string;
    mainHeading: string;
    subtitle: string;
    empty: string;
    details: string;
    location: string;
    salary: string;
    type: string;
    deadline: string;
    deadlineDetail: string;
    backLink: string;
    jobDescription: string;
    jobRequirements: string;
    benefits: string;
    guideTitle: string;
    guideDesc: string;
  };
  contact: {
    title: string;
    contactUs: string;
    description: string;
    email: string;
    hotlineZalo: string;
    officeAddress: string;
    sendRequest: string;
    sendRequestSub: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    successTitle: string;
    successDesc: string;
    unknownError: string;
  };
  about: {
    title: string;
    overview: string;
    description: string;
    industrialTitle: string;
    industrialDesc: string;
    chemicalTitle: string;
    chemicalDesc: string;
    networkTitle: string;
    valueConnection: string;
    networkDesc1: string;
    networkDesc2: string;
    coreValuesTitle: string;
    coreValuesDesc: string;
    techTitle: string;
    techDesc: string;
    qualityTitle: string;
    qualityDesc: string;
    breakthroughTitle: string;
    breakthroughDesc: string;
    value1Title: string;
    value1Desc: string;
    value2Title: string;
    value2Desc: string;
    value3Title: string;
    value3Desc: string;
    exploreMore: string;
    viewMore: string;
    foodCardTitle: string;
    cosmeticCardTitle: string;
    newsCardTitle: string;
  };
  home: {
    banner1Title: string;
    banner1Desc: string;
    banner2Title: string;
    banner2Desc: string;
    partnerTitle: string;
    partnerDesc: string;
    foodTitle: string;
    foodDesc: string;
    cosmeticTitle: string;
    viewAll: string;
    learnMore: string;
    aboutDesc: string;
    value1Title: string;
    value1Desc: string;
    value2Title: string;
    value2Desc: string;
    value3Title: string;
    value3Desc: string;
    newsCenterTitle: string;
    newsMoreBtn: string;
    whyChooseTitle: string;
    whyChooseDesc: string;
    whyChoose1Title: string;
    whyChoose1Desc: string;
    whyChoose2Title: string;
    whyChoose2Desc: string;
    whyChoose3Title: string;
    whyChoose3Desc: string;
    latestNewsTitle: string;
    latestNewsDesc: string;
    readMore: string;
  };
  products: {
    foodTitle: string;
    cosmeticTitle: string;
    emptyFood: string;
    emptyCosmetic: string;
    viewMore: string;
    homeBreadcrumb: string;
    foodBreadcrumb: string;
    cosmeticBreadcrumb: string;
    descriptionTitle: string;
    inquiryFoodButton: string;
    inquiryCosmeticButton: string;
    zaloButton: string;
    relatedTitle: string;
    specsTitle: string;
    specName: string;
    specValue: string;
    noSpecs: string;
    noApps: string;
    packTitle: string;
    noPack: string;
    tabDesc: string;
    tabSpecs: string;
    tabAppsFood: string;
    tabAppsCosmetic: string;
    tabPack: string;
    qnaTab: string;
    qnaTitle: string;
    qnaReplied: string;
    qnaEmpty: string;
    qnaFormTitle: string;
    qnaSuccessTitle: string;
    qnaSuccessDesc: string;
    qnaError: string;
    qnaNameLabel: string;
    qnaNamePlaceholder: string;
    qnaEmailLabel: string;
    qnaPhoneLabel: string;
    qnaPhonePlaceholder: string;
    qnaQuestionLabel: string;
    qnaQuestionPlaceholder: string;
    qnaSending: string;
    qnaSend: string;
    qnaAppsFoodTitle: string;
    qnaAppsCosmeticTitle: string;
  };
  newsList: {
    bannerTitle: string;
    featuredTitle: string;
    allTitle: string;
    emptyText: string;
    backButton: string;
    authorLabel: string;
    backToNews: string;
    allTab: string;
    cosmeticTab: string;
    foodTab: string;
    marketTab: string;
  };
  policies: {
    bannerTitle: string;
    mainHeading: string;
    updated: string;
    details: string;
    backLink: string;
    corporatePolicy: string;
    lastUpdated: string;
  };
  search: {
    bannerTitle: string;
    foundResults: string;
    notFoundResults: string;
    noProducts: string;
    noProductsDesc: string;
    backHome: string;
    productDetails: string;
    foodIngredient: string;
    cosmeticIngredient: string;
  };
  share: {
    title: string;
    facebook: string;
    zalo: string;
    twitter: string;
    copy: string;
    copied: string;
  };
};

const dicts = {
  vi: {
    common: {
      loading: "Đang tải...",
      scrollToTop: "Lên đầu trang",
    },
    header: {
      about: "GIỚI THIỆU",
      foodIngredients: "NGUYÊN LIỆU THỰC PHẨM",
      cosmeticIngredients: "NGUYÊN LIỆU MỸ PHẨM",
      news: "TIN TỨC",
      contact: "LIÊN HỆ",
      searchTitle: "Tìm kiếm sản phẩm",
      searchPlaceholder: "Nhập tên sản phẩm hoặc từ khóa...",
      searchButton: "Tìm",
      searchSearching: "Đang tìm kiếm...",
      searchNoResults: "Không tìm thấy kết quả",
      searchTryOther: "Thử tìm kiếm với từ khóa khác",
      searchProducts: "Sản phẩm",
      searchFood: "Thực phẩm",
      searchCosmetic: "Mỹ phẩm",
      searchNews: "Tin tức & Bài viết",
      searchPopularKeywords: "Từ khóa phổ biến",
      searchSuggestedProducts: "Sản phẩm gợi ý",
    },
    footer: {
      products: "SẢN PHẨM",
      foodIngredients: "Nguyên liệu Thực phẩm",
      cosmeticIngredients: "Nguyên liệu Mỹ phẩm",
      aboutUs: "Về chúng tôi",
      newsEvents: "Tin tức & Sự kiện",
      careers: "Cơ hội nghề nghiệp",
      contactTitle: "Hãy liên hệ với chúng tôi!",
      contactSub: "Chúng tôi sẽ mang đến giải pháp phù hợp nhất cho bạn!",
      emailPlaceholder: "Nhập email của bạn...",
      contactZalo: "LIÊN HỆ ZALO",
      hotline: "HOTLINE: 0969 700 520",
      copyright: "Sophpower Vietnam. Bảo lưu mọi quyền.",
      description: "Sophpower là đối tác cung ứng nguyên liệu công nghiệp & hóa chất đa quốc gia uy tín. Chúng tôi cam kết cung cấp nguồn nguyên liệu chất lượng cao tuân thủ các quy trình kiểm định nghiêm ngặt theo tiêu chuẩn quốc tế như ISO, HACCP, HALAL, Kosher và FDA.",
      emailSuccess: "Cảm ơn bạn! Chúng tôi đã nhận được email và sẽ liên hệ tư vấn trong thời gian sớm nhất.",
      address: "Địa chỉ: Số 37, đường 19E, phường An Lạc, quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
      emailSubmitAria: "Gửi email",
    },
    recruitment: {
      title: "RECRUITMENT",
      mainHeading: "CƠ HỘI NGHỀ NGHIỆP",
      subtitle: "Gia nhập đội ngũ Sophpower Việt Nam để cùng phát triển chuỗi cung ứng nguyên liệu công nghiệp & hóa chất hàng đầu.",
      empty: "Hiện tại chưa có vị trí tuyển dụng nào đang mở. Vui lòng quay lại sau!",
      details: "CHI TIẾT",
      location: "Địa điểm",
      salary: "Lương",
      type: "Loại hình",
      deadline: "Hạn:",
      deadlineDetail: "Hạn nộp:",
      backLink: "Quay lại cơ hội nghề nghiệp",
      jobDescription: "MÔ TẢ CÔNG VIỆC",
      jobRequirements: "YÊU CẦU CÔNG VIỆC",
      benefits: "QUYỀN LỢI ĐƯỢC HƯỞNG",
      guideTitle: "Hướng dẫn nộp hồ sơ:",
      guideDesc: "Ứng viên quan tâm vui lòng gửi CV ứng tuyển kèm tiêu đề [Họ tên - Vị trí ứng tuyển] về địa chỉ email của bộ phận tuyển dụng:",
    },
    contact: {
      title: "LIÊN HỆ",
      contactUs: "LIÊN HỆ CHÚNG TÔI",
      description: "Hãy liên hệ với chúng tôi để nhận tư vấn chuyên sâu về nguyên liệu thực phẩm, nguyên liệu mỹ phẩm, các chứng nhận COA/MSDS cũng như báo giá cung ứng số lượng lớn tốt nhất.",
      email: "EMAIL",
      hotlineZalo: "HOTLINE / ZALO",
      officeAddress: "ĐỊA CHỈ VĂN PHÒNG",
      sendRequest: "GỬI YÊU CẦU LIÊN HỆ",
      sendRequestSub: "Vui lòng để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ lại trong vòng 24h.",
      nameLabel: "Họ và tên",
      emailLabel: "Địa chỉ email",
      phoneLabel: "Số điện thoại",
      messageLabel: "Nội dung tin nhắn",
      namePlaceholder: "Nhập họ và tên của bạn",
      emailPlaceholder: "Nhập địa chỉ email để liên hệ",
      phonePlaceholder: "Nhập số điện thoại của bạn",
      messagePlaceholder: "Nhập nội dung yêu cầu tư vấn...",
      sendBtn: "Gửi yêu cầu",
      sendingBtn: "Đang gửi...",
      successTitle: "Gửi yêu cầu thành công!",
      successDesc: "Cảm ơn bạn đã liên hệ với Sophpower. Chúng tôi sẽ phản hồi lại thông tin qua email trong thời gian sớm nhất.",
      unknownError: "Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.",
    },
    about: {
      title: "VỀ CHÚNG TÔI",
      overview: "Tổng quan doanh nghiệp",
      description: "Sophpower là một công ty thương mại đa quốc gia có trụ sở tại Việt Nam, với hoạt động cốt lõi được chia thành hai phân khúc sản phẩm chính:",
      industrialTitle: "Sản phẩm Công nghiệp",
      industrialDesc: "Tập trung vào các thiết bị nguồn công nghiệp và các sản phẩm phụ trợ liên quan.",
      chemicalTitle: "Sản phẩm Hóa chất",
      chemicalDesc: "Cung cấp các nhóm nguyên liệu thực phẩm và nguyên liệu thô cho ngành mỹ phẩm.",
      networkTitle: "Mạng lưới & Chất lượng",
      valueConnection: "Liên kết Giá trị Toàn diện",
      networkDesc1: "Trong phân khúc sản phẩm hóa chất, chúng tôi tận dụng mạng lưới chuỗi cung ứng toàn cầu vững chắc cùng sự thấu hiểu sâu sắc về thị trường địa phương để kết nối các nhà sản xuất với nguồn nguyên liệu và thành phần chất lượng cao. Tất cả các sản phẩm đều được tuyển chọn kỹ lưỡng và kiểm soát chất lượng nghiêm ngặt trong suốt quá trình cung ứng, tuân thủ đầy đủ các tiêu chuẩn quốc tế như ISO, HACCP, HALAL, Kosher, và FDA, đảm bảo chất lượng đồng đều, an toàn và truy xuất nguồn gốc rõ ràng.",
      networkDesc2: "Là đối tác thương mại tin cậy của khách hàng, lấy triết lý \"khách hàng làm trung tâm\" làm định hướng cốt lõi, chúng tôi luôn cam kết đảm bảo nguồn cung ổn định, hệ thống giá cả cạnh tranh cao cùng mô hình dịch vụ linh hoạt, đáp ứng nhanh chóng các nhu cầu thực tế. Chúng tôi hỗ trợ đắc lực giúp đối tác tối ưu hóa chi phí, nâng cao hiệu quả mua hàng và tăng cường lợi thế cạnh tranh trên thị trường biến động không ngừng.",
      coreValuesTitle: "GIÁ TRỊ CỐT LÕI",
      coreValuesDesc: "Chúng tôi xây dựng năng lực cạnh tranh và niềm tin bền vững thông qua việc làm chủ quy trình công nghệ cao, cam kết chất lượng sản phẩm chuẩn quốc tế và tiên phong phát triển các giải pháp đột phá.",
      techTitle: "Công nghệ",
      techDesc: "Chúng tôi luôn áp dụng các giải pháp công nghệ tiên tiến nhất để mang lại hiệu quả vượt trội.",
      qualityTitle: "Chất lượng",
      qualityDesc: "Cam kết chất lượng sản phẩm chuẩn quốc tế, đảm bảo an toàn tuyệt đối.",
      breakthroughTitle: "Đột phá",
      breakthroughDesc: "Không ngừng nghiên cứu và đổi mới sáng tạo để đem lại giá trị tối ưu cho khách hàng.",
      value1Title: "Năng lực chuyên sâu",
      value1Desc: "Chuyên gia trong lĩnh vực xử lý các hợp chất khó tan, sở hữu quy trình khép kín từ nghiên cứu và phát triển (R&D) đến sản xuất nguyên liệu quy mô lớn.",
      value2Title: "Niềm tin từ thị trường",
      value2Desc: "Là Doanh nghiệp Công nghệ cao cấp Quốc gia, chúng tôi cam kết mang đến những sản phẩm an toàn, tin cậy và đạt tiêu chuẩn chất lượng vượt trội.",
      value3Title: "Định hướng đổi mới sáng tạo",
      value3Desc: "Tiên phong thúc đẩy các giải pháp thông qua công nghệ siêu phân tử (Supramolecular Technology) độc quyền đã được cấp bằng sáng chế.",
      exploreMore: "Khám phá thêm",
      viewMore: "Xem thêm",
      foodCardTitle: "Nguyên liệu Thực phẩm",
      cosmeticCardTitle: "Nguyên liệu Mỹ phẩm",
      newsCardTitle: "Trung tâm Tin tức",
    },
    home: {
      banner1Title: "Sophpower Vietnam",
      banner1Desc: "Nguồn cung cấp nguyên liệu thực phẩm và mỹ phẩm chất lượng hàng đầu.",
      banner2Title: "Giải pháp tối ưu",
      banner2Desc: "Đồng hành và hỗ trợ sự phát triển bền vững của doanh nghiệp bạn.",
      partnerTitle: "ĐỐI TÁC CUNG ỨNG NGUYÊN LIỆU HÀNG ĐẦU",
      partnerDesc: "Sophpower Vietnam cung cấp giải pháp nguồn nguyên liệu toàn diện cho ngành công nghiệp thực phẩm và mỹ phẩm, kết nối tinh hoa toàn cầu đến doanh nghiệp của bạn.",
      foodTitle: "NGUYÊN LIỆU THỰC PHẨM",
      foodDesc: "Chúng tôi hợp tác với các nhà cung ứng toàn cầu uy tín để mang đến các giải pháp nguyên liệu thực phẩm, chất tạo màu tự nhiên và chất ổn định an toàn cho các nhà sản xuất tại Việt Nam.",
      cosmeticTitle: "NGUYÊN LIỆU MỸ PHẨM",
      viewAll: "Xem toàn bộ",
      learnMore: "TÌM HIỂU THÊM",
      aboutDesc: "Sophpower là một công ty thương mại đa quốc gia có trụ sở tại Việt Nam, tập trung vào hai phân khúc chính là Sản phẩm Công nghiệp và Sản phẩm Hóa chất. Đối với mảng hóa chất, chúng tôi sở hữu mạng lưới cung ứng đáng tin cậy phục vụ các tiêu chuẩn quốc tế ISO, HACCP, HALAL, Kosher, FDA.",
      value1Title: "Năng lực chuyên sâu",
      value1Desc: "Chuyên gia trong lĩnh vực xử lý các hợp chất khó tan, sở hữu quy trình khép kín từ nghiên cứu và phát triển (R&D) đến sản xuất quy mô lớn.",
      value2Title: "Niềm tin từ thị trường",
      value2Desc: "Là Doanh nghiệp Công nghệ cao cấp Quốc gia, chúng tôi cam kết mang đến những sản phẩm an toàn, tin cậy và chất lượng vượt trội.",
      value3Title: "Định hướng đổi mới sáng tạo",
      value3Desc: "Tiên phong thúc đẩy các giải pháp thông qua công nghệ siêu phân tử (Supramolecular Technology) đã được cấp bằng sáng chế.",
      newsCenterTitle: "TRUNG TÂM TIN TỨC",
      newsMoreBtn: "XEM THÊM TIN TỨC",
      whyChooseTitle: "TẠI SAO CHỌN SOPHPOWER",
      whyChooseDesc: "Chúng tôi mang lại giá trị gia tăng vượt trội và là sự lựa chọn hàng đầu của các thương hiệu uy tín.",
      whyChoose1Title: "Sản phẩm Đa dạng & Độc quyền",
      whyChoose1Desc: "Cung ứng hàng chục nhóm nguyên liệu hiếm, độc quyền từ các đối tác lớn toàn cầu.",
      whyChoose2Title: "Chất lượng Đạt chuẩn Quốc tế",
      whyChoose2Desc: "Đầy đủ COA, MSDS, và các chứng nhận an toàn thực phẩm COA/Halal/Kosher/FDA.",
      whyChoose3Title: "Giá cả & Dịch vụ Vượt trội",
      whyChoose3Desc: "Chính sách giá sỉ cạnh tranh, dịch vụ giao hàng nhanh chóng và hỗ trợ kỹ thuật tận tâm.",
      latestNewsTitle: "TIN TỨC MỚI NHẤT",
      latestNewsDesc: "Cập nhật xu hướng thị trường, kiến thức chuyên ngành và tin tức hoạt động từ Sophpower.",
      readMore: "Đọc tiếp",
    },
    products: {
      foodTitle: "NGUYÊN LIỆU THỰC PHẨM",
      cosmeticTitle: "NGUYÊN LIỆU MỸ PHẨM",
      emptyFood: "Không tìm thấy sản phẩm nguyên liệu thực phẩm nào.",
      emptyCosmetic: "Không tìm thấy sản phẩm nguyên liệu mỹ phẩm nào.",
      viewMore: "XEM THÊM",
      homeBreadcrumb: "Trang chủ",
      foodBreadcrumb: "Nguyên liệu thực phẩm",
      cosmeticBreadcrumb: "Nguyên liệu mỹ phẩm",
      descriptionTitle: "Mô tả sản phẩm",
      inquiryFoodButton: "YÊU CẦU BÁO GIÁ SẢN PHẨM",
      inquiryCosmeticButton: "YÊU CẦU BÁO GIÁ SẢN PHẨM",
      zaloButton: "LIÊN HỆ QUA ZALO",
      relatedTitle: "Sản phẩm liên quan",
      specsTitle: "Thông số kiểm nghiệm & Chất lượng",
      specName: "Chỉ tiêu kỹ thuật",
      specValue: "Thông số chi tiết",
      noSpecs: "Chưa có thông số kỹ thuật.",
      noApps: "Chưa có thông tin ứng dụng.",
      packTitle: "Quy cách & Đóng gói tiêu chuẩn",
      noPack: "Chưa rõ quy cách đóng gói",
      tabDesc: "Mô tả chi tiết",
      tabSpecs: "Thông số kỹ thuật",
      tabAppsFood: "Ứng dụng thực tế",
      tabAppsCosmetic: "Ứng dụng sản xuất",
      tabPack: "Quy cách đóng gói",
      qnaTab: "Hỏi đáp sản phẩm",
      qnaTitle: "Hỏi đáp & Thắc mắc về sản phẩm",
      qnaReplied: "Sophpower trả lời:",
      qnaEmpty: "Chưa có câu hỏi nào được công bố cho sản phẩm này. Hãy gửi câu hỏi đầu tiên của bạn dưới đây!",
      qnaFormTitle: "Gửi câu hỏi của bạn cho chúng tôi",
      qnaSuccessTitle: "Gửi câu hỏi thành công!",
      qnaSuccessDesc: "Chúng tôi đã tiếp nhận câu hỏi của bạn và sẽ phản hồi qua email/số điện thoại trong thời gian sớm nhất.",
      qnaError: "Gửi câu hỏi thất bại. Vui lòng thử lại sau.",
      qnaNameLabel: "Họ và tên",
      qnaNamePlaceholder: "Nhập họ tên của bạn",
      qnaEmailLabel: "Email liên hệ",
      qnaPhoneLabel: "Số điện thoại",
      qnaPhonePlaceholder: "Nhập Số điện thoại",
      qnaQuestionLabel: "Nội dung câu hỏi",
      qnaQuestionPlaceholder: "Nhập thắc mắc của bạn về sản phẩm này...",
      qnaSending: "Đang gửi...",
      qnaSend: "GỬI CÂU HỎI",
      qnaAppsFoodTitle: "Các ứng dụng chính trong sản xuất",
      qnaAppsCosmeticTitle: "Các ứng dụng sản xuất chính",
    },
    newsList: {
      bannerTitle: "TRUNG TÂM TIN TỨC",
      featuredTitle: "BÀI VIẾT NỔI BẬT",
      allTitle: "TẤT CẢ BÀI VIẾT",
      emptyText: "Chưa có bài viết nào thuộc danh mục này.",
      backButton: "Quay lại xem tất cả",
      authorLabel: "Tác giả",
      backToNews: "Quay lại Trung tâm tin tức",
      allTab: "Tất cả",
      cosmeticTab: "Nguyên liệu mỹ phẩm",
      foodTab: "Nguyên liệu thực phẩm",
      marketTab: "Thị trường",
    },
    policies: {
      bannerTitle: "CHÍNH SÁCH",
      mainHeading: "CHÍNH SÁCH VÀ ĐIỀU KHOẢN",
      updated: "Cập nhật",
      details: "CHI TIẾT",
      backLink: "Quay lại danh mục Chính sách",
      corporatePolicy: "Chính sách doanh nghiệp",
      lastUpdated: "Ngày cập nhật",
    },
    search: {
      bannerTitle: "KẾT QUẢ TÌM KIẾM",
      foundResults: "Tìm thấy {{count}} sản phẩm phù hợp cho từ khóa \"{{keyword}}\"",
      notFoundResults: "Không tìm thấy kết quả phù hợp cho \"{{keyword}}\". Vui lòng thử tìm với từ khóa khác.",
      noProducts: "Không tìm thấy sản phẩm",
      noProductsDesc: "Không tìm thấy kết quả phù hợp. Vui lòng thử tìm với từ khóa khác như \"Beta-carotene\" hoặc \"Niacinamide\".",
      backHome: "Quay lại trang chủ",
      productDetails: "CHI TIẾT SẢN PHẨM",
      foodIngredient: "Nguyên liệu thực phẩm",
      cosmeticIngredient: "Nguyên liệu mỹ phẩm",
    },
    share: {
      title: "Chia sẻ bài viết:",
      facebook: "Chia sẻ lên Facebook",
      zalo: "Chia sẻ lên Zalo",
      twitter: "Chia sẻ lên Twitter/X",
      copy: "Sao chép liên kết",
      copied: "Đã sao chép!",
    },
  },
  en: {
    common: {
      loading: "Loading...",
      scrollToTop: "Scroll to top",
    },
    header: {
      about: "ABOUT US",
      foodIngredients: "FOOD INGREDIENTS",
      cosmeticIngredients: "COSMETIC INGREDIENTS",
      news: "NEWS",
      contact: "CONTACT",
      searchTitle: "Search Products",
      searchPlaceholder: "Enter product name or keyword...",
      searchButton: "Search",
      searchSearching: "Searching...",
      searchNoResults: "No results found",
      searchTryOther: "Try searching with another keyword",
      searchProducts: "Products",
      searchFood: "Food",
      searchCosmetic: "Cosmetic",
      searchNews: "News & Articles",
      searchPopularKeywords: "Popular Keywords",
      searchSuggestedProducts: "Suggested Products",
    },
    footer: {
      products: "PRODUCTS",
      foodIngredients: "Food Ingredients",
      cosmeticIngredients: "Cosmetic Ingredients",
      aboutUs: "About Us",
      newsEvents: "News & Events",
      careers: "Careers",
      contactTitle: "Get in Touch!",
      contactSub: "We will provide the most suitable solution for you!",
      emailPlaceholder: "Enter your email...",
      contactZalo: "CONTACT ZALO",
      hotline: "HOTLINE: 0969 700 520",
      copyright: "Sophpower Vietnam. All rights reserved.",
      description: "Sophpower is a reputable multinational supplier of industrial raw materials & chemicals. We are committed to providing high-quality raw materials complying with strict inspection procedures in accordance with international standards such as ISO, HACCP, HALAL, Kosher, and FDA.",
      emailSuccess: "Thank you! We have received your email and will contact you for consultation as soon as possible.",
      address: "Address: No. 37, 19E Street, An Lac Ward, Binh Tan District, Ho Chi Minh City, Vietnam",
      emailSubmitAria: "Submit email",
    },
    recruitment: {
      title: "RECRUITMENT",
      mainHeading: "CAREER OPPORTUNITIES",
      subtitle: "Join the Sophpower Vietnam team to co-develop the leading industrial raw materials & chemical supply chain.",
      empty: "There are currently no open positions. Please check back later!",
      details: "DETAILS",
      location: "Location",
      salary: "Salary",
      type: "Type",
      deadline: "Deadline:",
      deadlineDetail: "Submission deadline:",
      backLink: "Back to Careers",
      jobDescription: "JOB DESCRIPTION",
      jobRequirements: "JOB REQUIREMENTS",
      benefits: "BENEFITS",
      guideTitle: "Application Guide:",
      guideDesc: "Interested candidates please send your application CV with the subject line [Full Name - Applied Position] to the recruitment department email:",
    },
    contact: {
      title: "CONTACT US",
      contactUs: "CONTACT US",
      description: "Please contact us for in-depth consultation on food ingredients, cosmetic ingredients, COA/MSDS certifications as well as the best bulk supply quotes.",
      email: "EMAIL",
      hotlineZalo: "HOTLINE / ZALO",
      officeAddress: "OFFICE ADDRESS",
      sendRequest: "SEND CONTACT REQUEST",
      sendRequestSub: "Please leave your information, our specialists will contact you within 24 hours.",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      messageLabel: "Message Content",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "Enter contact email address",
      phonePlaceholder: "Enter your phone number",
      messagePlaceholder: "Enter consultation request content...",
      sendBtn: "Send Request",
      sendingBtn: "Sending...",
      successTitle: "Request submitted successfully!",
      successDesc: "Thank you for contacting Sophpower. We will respond via email as soon as possible.",
      unknownError: "An unknown error occurred. Please try again later.",
    },
    about: {
      title: "ABOUT US",
      overview: "Company Overview",
      description: "Sophpower is a multinational trading company based in Vietnam, with its core activities divided into two main product segments:",
      industrialTitle: "Industrial Products",
      industrialDesc: "Focused on industrial power equipment and related auxiliary products.",
      chemicalTitle: "Chemical Products",
      chemicalDesc: "Supplying food raw materials and raw materials for the cosmetics industry.",
      networkTitle: "Network & Quality",
      valueConnection: "Comprehensive Value Connection",
      networkDesc1: "In the chemical product segment, we leverage a robust global supply chain network and deep local market understanding to connect manufacturers with high-quality raw materials and ingredients. All products are carefully selected and strictly quality controlled throughout the supply process, fully complying with international standards such as ISO, HACCP, HALAL, Kosher, and FDA, ensuring consistent quality, safety, and clear traceability.",
      networkDesc2: "As a trusted trading partner of our clients, taking the \"customer-centric\" philosophy as our core direction, we are always committed to ensuring stable supply, highly competitive pricing, and a flexible service model, quickly meeting actual needs. We effectively support partners in optimizing costs, improving purchasing efficiency, and strengthening competitive advantages in an ever-fluctuating market.",
      coreValuesTitle: "CORE VALUES",
      coreValuesDesc: "We build competitive capability and sustainable trust through mastering high-tech processes, committing to international standard product quality, and pioneering the development of breakthrough solutions.",
      techTitle: "Technology",
      techDesc: "We always apply the most advanced technological solutions to deliver outstanding efficiency.",
      qualityTitle: "Quality",
      qualityDesc: "Commitment to international standard product quality, ensuring absolute safety.",
      breakthroughTitle: "Breakthrough",
      breakthroughDesc: "Constantly researching and innovating to bring optimal value to customers.",
      value1Title: "In-depth Capability",
      value1Desc: "Experts in processing poorly soluble compounds, possessing a closed loop from research and development (R&D) to large-scale raw material production.",
      value2Title: "Market Trust",
      value2Desc: "As a National High-Tech Enterprise, we commit to delivering safe, reliable, and outstanding quality products.",
      value3Title: "Innovation Oriented",
      value3Desc: "Pioneering solutions through patented, exclusive supramolecular technology.",
      exploreMore: "Explore More",
      viewMore: "View more",
      foodCardTitle: "Food Ingredients",
      cosmeticCardTitle: "Cosmetic Ingredients",
      newsCardTitle: "News Center",
    },
    home: {
      banner1Title: "Sophpower Vietnam",
      banner1Desc: "A leading supplier of high-quality food and cosmetic ingredients.",
      banner2Title: "Optimal Solutions",
      banner2Desc: "Accompanying and supporting the sustainable development of your business.",
      partnerTitle: "LEADING RAW MATERIAL SUPPLY PARTNER",
      partnerDesc: "Sophpower Vietnam provides comprehensive raw material solutions for the food and cosmetic industries, connecting global excellence to your business.",
      foodTitle: "FOOD INGREDIENTS",
      foodDesc: "We cooperate with reputable global suppliers to bring food raw material solutions, natural colorings and safe stabilizers to manufacturers in Vietnam.",
      cosmeticTitle: "COSMETIC INGREDIENTS",
      viewAll: "View All",
      learnMore: "LEARN MORE",
      aboutDesc: "Sophpower is a multinational trading company based in Vietnam, focusing on two main segments: Industrial Products and Chemical Products. For the chemical sector, we possess a reliable supply network serving international standards ISO, HACCP, HALAL, Kosher, FDA.",
      value1Title: "In-depth Capability",
      value1Desc: "Specialist in processing poorly soluble compounds, possessing a closed process from research and development (R&D) to large-scale production.",
      value2Title: "Market Trust",
      value2Desc: "As a National High-Tech Enterprise, we commit to delivering safe, reliable, and outstanding quality products.",
      value3Title: "Innovation Oriented",
      value3Desc: "Pioneering solutions through patented supramolecular technology.",
      newsCenterTitle: "NEWS CENTER",
      newsMoreBtn: "MORE NEWS",
      whyChooseTitle: "WHY CHOOSE SOPHPOWER",
      whyChooseDesc: "We bring outstanding added value and are the top choice for reputable brands.",
      whyChoose1Title: "Diverse & Exclusive Products",
      whyChoose1Desc: "Supplying dozens of rare, exclusive raw material groups from major global partners.",
      whyChoose2Title: "International Quality Standard",
      whyChoose2Desc: "Full COA, MSDS, and food safety certifications COA/Halal/Kosher/FDA.",
      whyChoose3Title: "Outstanding Pricing & Service",
      whyChoose3Desc: "Competitive wholesale price policy, fast delivery service, and dedicated technical support.",
      latestNewsTitle: "LATEST NEWS",
      latestNewsDesc: "Update market trends, industry knowledge, and operational news from Sophpower.",
      readMore: "Read More",
    },
    products: {
      foodTitle: "FOOD INGREDIENTS",
      cosmeticTitle: "COSMETIC INGREDIENTS",
      emptyFood: "No food ingredients products found.",
      emptyCosmetic: "No cosmetic ingredients products found.",
      viewMore: "VIEW DETAILS",
      homeBreadcrumb: "Home",
      foodBreadcrumb: "Food Ingredients",
      cosmeticBreadcrumb: "Cosmetic Ingredients",
      descriptionTitle: "Product Description",
      inquiryFoodButton: "REQUEST PRODUCT QUOTE",
      inquiryCosmeticButton: "REQUEST INGREDIENT QUOTE",
      zaloButton: "CONTACT VIA ZALO",
      relatedTitle: "Related Products",
      specsTitle: "Testing Specs & Quality",
      specName: "Technical Indicator",
      specValue: "Detailed Parameters",
      noSpecs: "No technical specifications available.",
      noApps: "No application information available.",
      packTitle: "Standard Packing & Specifications",
      noPack: "Packing specification not specified",
      tabDesc: "Detailed Description",
      tabSpecs: "Technical Specifications",
      tabAppsFood: "Practical Applications",
      tabAppsCosmetic: "Production Applications",
      tabPack: "Packaging Specifications",
      qnaTab: "Product Q&A",
      qnaTitle: "Q&A & Product Inquiries",
      qnaReplied: "Sophpower replied:",
      qnaEmpty: "No questions have been published for this product yet. Send your first question below!",
      qnaFormTitle: "Submit your question to us",
      qnaSuccessTitle: "Question submitted successfully!",
      qnaSuccessDesc: "We have received your question and will respond via email/phone as soon as possible.",
      qnaError: "Failed to submit question. Please try again later.",
      qnaNameLabel: "Full Name",
      qnaNamePlaceholder: "Enter your name",
      qnaEmailLabel: "Contact Email",
      qnaPhoneLabel: "Phone Number",
      qnaPhonePlaceholder: "Enter phone number (optional)",
      qnaQuestionLabel: "Question Content",
      qnaQuestionPlaceholder: "Enter your question about this product...",
      qnaSending: "Sending...",
      qnaSend: "SUBMIT QUESTION",
      qnaAppsFoodTitle: "Key applications in food production",
      qnaAppsCosmeticTitle: "Key production applications",
    },
    newsList: {
      bannerTitle: "NEWS CENTER",
      featuredTitle: "FEATURED POST",
      allTitle: "ALL ARTICLES",
      emptyText: "No articles found in this category.",
      backButton: "Back to view all",
      authorLabel: "Author",
      backToNews: "Back to News Center",
      allTab: "All",
      cosmeticTab: "Cosmetic Ingredients",
      foodTab: "Food Ingredients",
      marketTab: "Market",
    },
    policies: {
      bannerTitle: "POLICIES",
      mainHeading: "POLICIES AND TERMS",
      updated: "Updated",
      details: "DETAILS",
      backLink: "Back to Policies",
      corporatePolicy: "Corporate Policy",
      lastUpdated: "Last updated",
    },
    search: {
      bannerTitle: "SEARCH RESULTS",
      foundResults: "Found {{count}} matching products for keyword \"{{keyword}}\"",
      notFoundResults: "No matching results found for \"{{keyword}}\". Please try searching with another keyword.",
      noProducts: "No products found",
      noProductsDesc: "No matching results found. Please try searching with another keyword like \"Beta-carotene\" or \"Niacinamide\".",
      backHome: "Back to homepage",
      productDetails: "PRODUCT DETAILS",
      foodIngredient: "Food ingredient",
      cosmeticIngredient: "Cosmetic ingredient",
    },
    share: {
      title: "Share article:",
      facebook: "Share on Facebook",
      zalo: "Share on Zalo",
      twitter: "Share on Twitter/X",
      copy: "Copy link",
      copied: "Copied!",
    },
  },
};

export const siteDictionaries: Record<Locale, SiteDictionary> = {
  vi: dicts.vi,
  en: dicts.en,
  zh: dicts.en,
  ja: dicts.en,
};

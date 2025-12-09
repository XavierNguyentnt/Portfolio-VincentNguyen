export type Language = 'en' | 'vi';

export const content = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      languages: "Languages",
      contact: "Contact",
    },
    hero: {
      name: "Nguyen Viet Vinh",
      title: "ESG Officer | CSR Compliance Specialist | Project Coordinator",
      tagline: "Committed to sustainable value creation through compliance, transparency, and responsible management.",
      cta: "Download CV",
    },
    about: {
      title: "About Me",
      summary: "I am an ESG and Compliance professional with experience in internal auditing, CSR compliance, documentation, and project coordination. With analytical strengths and a research background, I support organizations in building systematic ESG practices, improving documentation quality, and strengthening sustainable development performance."
    },
    skills: {
      title: "Skills",
      categories: {
        esg: {
          title: "ESG & Compliance",
          items: ["CSR Compliance", "Environment", "Labor", "OHS", "Fire Safety", "Security", "Internal Audit", "ESG reporting", "Document control", "CAP follow-up"]
        },
        project: {
          title: "Project Management",
          items: ["Planning", "Risk Management", "Coordination", "KPI Tracking", "Stakeholder engagement"]
        },
        research: {
          title: "Research & Documentation",
          items: ["Analytical writing", "SOP writing", "Data consolidation"]
        }
      }
    },
    experience: {
      title: "Experience",
      jobs: [
        {
          role: "Project Secretary / Project Coordinator",
          company: "Tran Nhan Tong Institute, VNU Hanoi",
          period: "05/2021 – Present",
          description: [
            "Managed a national Buddhist scripture translation project.",
            "Created SOPs, documentation standards, progress reports.",
            "Monitored risks and coordinated 20+ translators and researchers.",
            "Managed contracts, records, and budget."
          ]
        },
        {
          role: "Internal Compliance Officer",
          company: "Yi Da Vietnam Limited",
          period: "02/2020 – 04/2021",
          description: [
            "Performed internal audits on environment, labor, OHS, fire safety, security.",
            "Prepared compliance documentation & audit evidence.",
            "Supported audits: RCS, GOTS, OCS, Higg, ZDHC, LABS, Better Work.",
            "Followed up CAPs to close non-conformities."
          ]
        },
        {
          role: "Senior Clerk / Project Assistant",
          company: "Yi Da Vietnam Limited",
          period: "04/2019 – 02/2020",
          description: [
            "Managed construction documents.",
            "Supervised contractor progress.",
            "Prepared progress reports for management."
          ]
        },
        {
          role: "Chinese–Vietnamese Interpreter",
          company: "Renhe International Development Co., Ltd. (Grandho Group)",
          period: "12/2017 – 03/2019",
          description: [
            "Interpreted between Taiwanese management and Vietnamese workers.",
            "Supported dispute resolution and welfare discussions.",
            "Assisted with residence permits, visas, insurance, and tax."
          ]
        }
      ]
    },
    projects: {
      title: "Featured Projects",
      items: [
        {
          title: "Internal Compliance Audit System",
          description: "Standardized compliance documentation (8 categories). Reduced audit preparation time by 30–40%. Improved cross-department cooperation and CAP closure."
        },
        {
          title: "National Buddhist Canon Translation Project",
          description: "Coordinated 20+ researchers & translators. Ensured accurate documentation, progress tracking, and risk control."
        },
        {
          title: "Third-Party Audit Preparation (Manufacturing)",
          description: "Supported multiple high-standard audits: GOTS, OCS, RCS, Higg, ZDHC. Ensured the factory maintained compliance with international buyers."
        }
      ]
    },
    education: {
      title: "Education",
      items: [
        {
          degree: "Master’s Degree in Sino–Nom Studies",
          school: "USSH – VNU Hanoi",
          year: "2021–2024",
          gpa: "GPA: 3.74"
        },
        {
          degree: "Bachelor’s Degree in Sino–Nom Studies",
          school: "USSH – VNU Hanoi",
          year: "2013–2017",
          gpa: "GPA: 3.33 (Distinction)"
        }
      ]
    },
    languages: {
      title: "Languages",
      items: [
        { name: "Vietnamese", level: "Native", percent: 100 },
        { name: "Chinese", level: "TOCFL B2; VSTEP C1", percent: 85 },
        { name: "English", level: "Intermediate", percent: 60 }
      ]
    },
    contact: {
      title: "Contact",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Message",
        submit: "Send Message"
      }
    }
  },
  vi: {
    nav: {
      about: "Giới thiệu",
      skills: "Kỹ năng",
      experience: "Kinh nghiệm",
      projects: "Dự án",
      education: "Học vấn",
      languages: "Ngoại ngữ",
      contact: "Liên hệ",
    },
    hero: {
      name: "Nguyễn Viết Vinh",
      title: "Chuyên viên ESG | Nhân viên Tuân thủ CSR | Điều phối Dự án",
      tagline: "Cam kết tạo ra giá trị bền vững thông qua tuân thủ, minh bạch và quản trị có trách nhiệm.",
      cta: "Tải CV",
    },
    about: {
      title: "Giới thiệu",
      summary: "Tôi là một chuyên viên ESG và Tuân thủ với kinh nghiệm đánh giá nội bộ, tuân thủ CSR, xây dựng tài liệu và điều phối dự án. Với nền tảng nghiên cứu và tư duy phân tích, tôi hỗ trợ tổ chức xây dựng hệ thống ESG bài bản, nâng cao chất lượng hồ sơ và tăng cường hiệu quả phát triển bền vững."
    },
    skills: {
      title: "Kỹ năng",
      categories: {
        esg: {
          title: "ESG & Tuân thủ",
          items: ["Tuân thủ CSR", "Môi trường", "Lao động", "ATVSLĐ", "PCCC", "An ninh", "Đánh giá nội bộ", "Báo cáo ESG", "Quản lý tài liệu", "Theo dõi CAP"]
        },
        project: {
          title: "Quản lý Dự án",
          items: ["Lập kế hoạch", "Quản lý rủi ro", "Điều phối", "Theo dõi KPI", "Gắn kết các bên liên quan"]
        },
        research: {
          title: "Nghiên cứu & Tài liệu",
          items: ["Viết phân tích", "Soạn SOP", "Tổng hợp dữ liệu"]
        }
      }
    },
    experience: {
      title: "Kinh nghiệm làm việc",
      jobs: [
        {
          role: "Thư ký Dự án / Điều phối viên",
          company: "Viện Trần Nhân Tông, ĐHQGHN",
          period: "05/2021 – Hiện tại",
          description: [
            "Quản lý dự án dịch thuật Tam tạng quy mô quốc gia.",
            "Soạn SOP, chuẩn hóa tài liệu, báo cáo tiến độ.",
            "Theo dõi rủi ro, điều phối 20+ dịch giả và nghiên cứu viên.",
            "Quản lý hồ sơ, hợp đồng và ngân sách."
          ]
        },
        {
          role: "Nhân viên Tuân thủ Nội bộ",
          company: "Công ty TNHH Yi Da Việt Nam",
          period: "02/2020 – 04/2021",
          description: [
            "Đánh giá nội bộ các mục: môi trường, lao động, ATVSLĐ, PCCC, an ninh.",
            "Chuẩn bị hồ sơ tuân thủ & bằng chứng đánh giá.",
            "Hỗ trợ đánh giá RCS, GOTS, OCS, Higg, ZDHC, LABS, Better Work.",
            "Theo dõi CAP để đóng NCR."
          ]
        },
        {
          role: "Thư ký Công trình / Trợ lý Dự án",
          company: "Công ty TNHH Yi Da Việt Nam",
          period: "04/2019 – 02/2020",
          description: [
            "Quản lý hồ sơ xây dựng.",
            "Giám sát tiến độ nhà thầu.",
            "Chuẩn bị báo cáo tiến độ."
          ]
        },
        {
          role: "Phiên dịch Tiếng Trung – Việt",
          company: "Công ty TNHH Phát triển Quốc tế Renhe (Tập đoàn Grandho)",
          period: "12/2017 – 03/2019",
          description: [
            "Phiên dịch giữa quản lý Đài Loan và công nhân Việt Nam.",
            "Hỗ trợ giải quyết xung đột & phúc lợi.",
            "Làm thủ tục cư trú, visa, bảo hiểm, thuế."
          ]
        }
      ]
    },
    projects: {
      title: "Dự án Tiêu biểu",
      items: [
        {
          title: "Hệ thống tuân thủ nội bộ",
          description: "Chuẩn hóa tài liệu tuân thủ (8 danh mục). Giảm 30–40% thời gian chuẩn bị đánh giá. Cải thiện hợp tác liên phòng ban và tỷ lệ đóng CAP."
        },
        {
          title: "Dự án Dịch thuật Tam tạng Thánh điển",
          description: "Điều phối 20+ nghiên cứu viên & dịch giả. Đảm bảo tính chính xác của tài liệu, theo dõi tiến độ và kiểm soát rủi ro."
        },
        {
          title: "Chuẩn bị đánh giá bên thứ ba (Sản xuất)",
          description: "Hỗ trợ nhiều kỳ đánh giá tiêu chuẩn cao: GOTS, OCS, RCS, Higg, ZDHC. Đảm bảo nhà máy duy trì tuân thủ với khách hàng quốc tế."
        }
      ]
    },
    education: {
      title: "Học vấn",
      items: [
        {
          degree: "Thạc sĩ Hán Nôm",
          school: "USSH – ĐHQGHN",
          year: "2021–2024",
          gpa: "GPA: 3.74"
        },
        {
          degree: "Cử nhân Hán Nôm",
          school: "USSH – ĐHQGHN",
          year: "2013–2017",
          gpa: "GPA: 3.33 (Giỏi)"
        }
      ]
    },
    languages: {
      title: "Ngoại ngữ",
      items: [
        { name: "Tiếng Việt", level: "Bản ngữ", percent: 100 },
        { name: "Tiếng Trung", level: "TOCFL B2; VSTEP C1", percent: 85 },
        { name: "Tiếng Anh", level: "Trung cấp", percent: 60 }
      ]
    },
    contact: {
      title: "Liên hệ",
      email: "Email",
      phone: "Điện thoại",
      linkedin: "LinkedIn",
      form: {
        name: "Họ tên",
        email: "Email",
        message: "Tin nhắn",
        submit: "Gửi tin nhắn"
      }
    }
  }
};

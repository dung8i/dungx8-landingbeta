/* ======================================================================
   data.js
   Toàn bộ nội dung "động" của website nằm ở đây (KHÔNG chứa hiệu ứng/logic).
   Trang admin.html đọc và chỉnh sửa đúng cấu trúc này, rồi xuất ra file
   data.js mới để bạn thay thế + commit lên GitHub.
   ====================================================================== */

window.SITE_DATA = {

  hero: {
    title: "TRANTHIENDUNG",
    tagline: "student • fpver • tinker • creator • maker • vibecoder",
    statuses: [
      { vi: "Đang code linh tinh", en: "Coding random stuff" },
      { vi: "Đang edit video", en: "Editing videos" },
      { vi: "Đang vọc vạch", en: "Tinkering around" },
      { vi: "Đang chế cháo mạch điện", en: "Soldering circuits" },
      { vi: "Đang làm việc", en: "Working" },
      { vi: "Đang bay FPV", en: "Flying FPV" },
      { vi: "Đang build quad", en: "Building a quad" }
    ]
  },

  about: {
    vi: "Xin chào, mình là Trần Thiên Dũng. Mình là một học sinh ở Việt Nam thích khám phá mọi thứ từ thiên văn học, công nghệ, điện tử và chế tạo. Mình thích tạo ra nội dung và lan tỏa nó đến mọi người.",
    en: "Hi, I'm Tran Thien Dung. I'm a student in Vietnam who loves exploring everything from astronomy and technology to electronics and making things. I enjoy creating content and sharing it with people."
  },

  projects: [
    {
      id: "savyo",
      title: "Savyo",
      tags: ["Fintech", "Web/App"],
      desc: {
        vi: "Dự án mua sắm hoàn tiền thông minh tích hợp AI.",
        en: "A smart AI-powered cashback shopping platform."
      },
      link: "https://savyo.site",
      linkable: true,
      bannerLetter: "S",
      bannerClass: "banner-savyo"
    },
    {
      id: "fpv-binh-dan",
      title: "FPV Bình Dân",
      tags: ["FPV", "Document", "Web"],
      desc: {
        vi: "Trang web cung cấp các kiến thức về FPV Drone cơ bản.",
        en: "A website providing basic FPV drone knowledge."
      },
      link: "",
      linkable: false,
      bannerLetter: "F",
      bannerClass: "banner-fpv"
    },
    {
      id: "agribridge",
      title: "AgriBridge",
      tags: ["Fintech", "Ecommerce", "Agri", "Web/App"],
      desc: {
        vi: "Dự án xây dựng sàn thương mại xuất khẩu nông sản thô Việt Nam.",
        en: "A trading platform for exporting raw Vietnamese agricultural produce."
      },
      link: "",
      linkable: false,
      bannerLetter: "A",
      bannerClass: "banner-agri"
    }
  ],

  journey: [
    {
      year: "2019",
      title: { vi: "Hobby", en: "Hobby" },
      desc: { vi: "Khởi đầu với niềm đam mê chế tạo, FPV, RC.", en: "Started with a passion for building, FPV, and RC." }
    },
    {
      year: "2023",
      title: { vi: "THPT Xuyên Mộc", en: "Xuyen Moc High School" },
      desc: { vi: "Học cấp 3 với nhiều kỷ niệm, cuộc thi, dự án.", en: "High school years full of memories, competitions and projects." }
    },
    {
      year: "2025",
      title: { vi: "Work", en: "Work" },
      desc: { vi: "Bắt đầu thử sức với affiliate và khá thành công :>", en: "Started trying affiliate marketing and did pretty well :>" }
    },
    {
      year: "2026+",
      title: { vi: "Đại học", en: "University" },
      desc: { vi: "Tiếp tục phát triển với content creator, startup dự án.", en: "Continuing to grow as a content creator and building startup projects." }
    }
  ],

  blog: {
    feedUrl: "https://blog.dungx8.click/feed",
    blogHomeUrl: "https://blog.dungx8.click",
    fallback: [
      { vi: "Bài viết mới nhất", en: "Latest post" },
      { vi: "Ghi chép quá trình chế tạo", en: "Build log notes" },
      { vi: "Chia sẻ kinh nghiệm FPV", en: "FPV experience notes" }
    ]
  },

  contact: {
    email: "thiendung1092008@gmail.com",
    location: "TP. Hồ Chí Minh, VN",
    facebook: { label: "Dũng", url: "https://www.facebook.com/dngtrn9928" },
    youtube: { label: "DMCF Lab", url: "https://www.youtube.com/@dmcf_lab" },
    tiktok: { label: "DMCF Lab", url: "https://www.tiktok.com/@dmcf_lab" },
    formEndpoint: "https://formsubmit.co/thiendung1092008@gmail.com",
    topics: [
      { vi: "FPV Drone", en: "FPV Drone" },
      { vi: "Phát triển Web", en: "Web Development" },
      { vi: "AI / Tự động hóa", en: "AI / Automation" },
      { vi: "Content Creation", en: "Content Creation" },
      { vi: "Hợp tác / Tài trợ", en: "Collab / Sponsorship" },
      { vi: "Khác", en: "Other" }
    ]
  },

  skills: {
    tags: ["Content Creator", "Digital Marketing", "VibeCoding"],
    bars: [
      { label: "Python", pct: 90 },
      { label: "C++", pct: 80 },
      { label: "JavaScript", pct: 70 }
    ]
  },

  music: {
    file: "audio/bgm.mp3",
    tooltip: "bgm.mp3"
  },

  footer: "made © 2026 made with DMCF"
};

export const siteConfig = {
  name: "TichXanh.AI",
  shortName: "TichXanh",
  description: "An Loid AI eco-system for waste classification, gamified carbon tracking, and real-world rewards.",
  year: new Date().getFullYear().toString(),
  poweredBy: "Loid AI",
  links: {
    playStore: "#",
    appStore: "#",
    githubMirror: "https://github.com/Loid-Trix-AI/tichxanh-ai/releases/latest",
    betaApply: "#",
    qrTarget: "https://tichxanh.ai/download",
    privacy: "#",
    terms: "#",
  },
  socials: {
    github: "https://github.com/Loid-Trix-AI",
    twitter: "#",
    linkedin: "#",
  },
  getQrCodeUrl: (size = "200x200") => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent("https://tichxanh.ai/download")}`;
  }
};

export type SiteConfig = typeof siteConfig;

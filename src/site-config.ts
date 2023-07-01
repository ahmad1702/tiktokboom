export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TikTokBoom",
  description:
    "A fun game kind of like minesweeper that originated from a tiktok filter.",
  mainNav: [] as { title: string; href: string }[],
  sidebarNav: [
    {
      title: "Experience",
      items: [
        {
          title: "Leaderboards",
          href: "/leaderboards",
          items: [],
        },
        {
          title: "Privacy",
          href: "/privacy",
          items: [],
        },
      ],
    },
    {
      title: "Social Links",
      items: [
        {
          title: "Linkedin",
          href: "https://www.linkedin.com/in/ahmad-sandid-485b59164/",
          items: [],
        },
        {
          title: "Github",
          href: "https://github.com/ahmad1702",
          items: [],
        },
        {
          title: "Email",
          href: "mailto:ahmad1702@gmail.com",
          items: [],
        },
      ],
    },
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/ahmad-sandid-485b59164/",
    github: "https://github.com/ahmad1702",
  },
  locale: "en-US",
};

export const siteConfig = {
  name: "JYP Dev Blog",
  title: "JYP Dev Blog",
  description: "AI, Flutter, 모바일 개발에 대한 기술 블로그",
  url: "https://jyp-dev-blog.vercel.app",
  author: {
    name: "JYP",
    github: "https://github.com/jyp",
    linkedin: "https://linkedin.com/in/jyp",
  },
  links: {
    github: "https://github.com/jyp",
    linkedin: "https://linkedin.com/in/jyp",
  },
  postsPerPage: 10,
  giscus: {
    repo: "" as `${string}/${string}`,
    repoId: "",
    category: "Comments",
    categoryId: "",
  },
} as const;

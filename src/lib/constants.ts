export const siteConfig = {
  name: "JYP Dev Blog",
  title: "JYP Dev Blog",
  description: "AI, Flutter, 모바일 개발에 대한 기술 블로그",
  url: "https://jyp-dev-blog.vercel.app",
  author: {
    name: "JYP",
    github: "https://github.com/hola726",
    linkedin: "https://www.linkedin.com/in/jyp96",
    email: "wodbs720@gmail.com",
  },
  links: {
    github: "https://github.com/hola726",
    linkedin: "https://www.linkedin.com/in/jyp96",
  },
  postsPerPage: 10,
  giscus: {
    repo: "hola726/jyp-dev-blog" as `${string}/${string}`,
    repoId: "R_kgDORQqg1g",
    category: "General",
    categoryId: "DIC_kwDORQqg1s4C2edG",
  },
} as const;

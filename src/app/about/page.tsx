import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "JYP 소개 - AI, Flutter, 모바일 개발자",
};

export default function AboutPage() {
  return (
    <div className="prose prose-slate mx-auto max-w-[720px] dark:prose-invert">
      <h1>About</h1>

      <p>
        안녕하세요, <strong>JYP</strong>입니다.
      </p>

      <p>
        AI, Flutter, 모바일 개발에 관심이 많은 개발자입니다.
        이 블로그에서는 개발하면서 배운 것들을 기록하고 공유합니다.
      </p>

      <h2>관심 분야</h2>
      <ul>
        <li>인공지능 (AI) / 머신러닝</li>
        <li>Flutter 크로스 플랫폼 개발</li>
        <li>모바일 앱 개발 (iOS / Android)</li>
        <li>개발 생산성 향상</li>
      </ul>

      <h2>연락처</h2>
      <div className="not-prose flex flex-wrap gap-4">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href="mailto:contact@jyp.dev"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
      </div>
    </div>
  );
}

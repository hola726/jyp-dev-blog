import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "JYP 소개 - AI, Flutter, 모바일 개발자",
};

const techStack = {
  Language: ["Dart", "Kotlin", "Swift"],
  Mobile: ["Flutter", "Bloc", "Provider"],
  Tools: ["Firebase", "Figma", "Sentry", "Amplitude", "Bitrise"],
};

const careers = [
  {
    company: "포들러스",
    role: "Mobile Developer",
    period: "2023.9 ~ 현재",
  },
  {
    company: "스마트선박벤처",
    role: "Mobile Developer",
    period: "2021.4 ~ 2023.8",
  },
];

export default function AboutPage() {
  return (
    <div className="prose prose-slate mx-auto max-w-[720px] dark:prose-invert">
      <h1>About</h1>

      <p>
        안녕하세요, <strong>JYP</strong>입니다.
      </p>

      <p>
        제품의 가치를 이해하고 이를 사용자에게 전달하는 모바일 개발자입니다.
        비효율적인 프로세스를 기술로 개선하는 것을 좋아하고, 가독성 있는 코드를
        지향합니다. 이 블로그에서는 개발하면서 배운 것들을 기록하고 공유합니다.
      </p>

      <h2>관심 분야</h2>
      <ul>
        <li>인공지능 (AI) / 머신러닝</li>
        <li>Flutter 크로스 플랫폼 개발</li>
        <li>모바일 앱 개발 (iOS / Android)</li>
        <li>개발 생산성 향상</li>
      </ul>

      <h2>기술 스택</h2>
      <div className="not-prose flex flex-col gap-3">
        {Object.entries(techStack).map(([category, items]) => (
          <div key={category} className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 shrink-0">
              {category}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>경력</h2>
      <div className="not-prose flex flex-col gap-2">
        {careers.map((career) => (
          <div
            key={career.company}
            className="flex items-baseline justify-between gap-4"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {career.company}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {career.role}
              </span>
            </div>
            <span className="text-sm text-slate-400 dark:text-slate-500 shrink-0">
              {career.period}
            </span>
          </div>
        ))}
      </div>

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
          href={`mailto:${siteConfig.author.email}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
      </div>
    </div>
  );
}

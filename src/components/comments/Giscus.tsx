"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import GiscusComponent from "@giscus/react";
import { siteConfig } from "@/lib/constants";

export default function Giscus() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const { repo, repoId, category, categoryId } = siteConfig.giscus;
  const isConfigured = (repo as string) !== "" && (repoId as string) !== "";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return <div ref={ref} className="h-64" />;

  if (!isConfigured) {
    return (
      <div ref={ref} className="rounded-lg border border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        댓글 기능을 사용하려면 Giscus를 설정해주세요.
        <br />
        <a
          href="https://giscus.app/ko"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-indigo-600 hover:underline dark:text-indigo-400"
        >
          giscus.app에서 설정하기
        </a>
      </div>
    );
  }

  return (
    <div ref={ref}>
      {visible && (
        <GiscusComponent
          repo={repo}
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          lang="ko"
          loading="lazy"
        />
      )}
    </div>
  );
}

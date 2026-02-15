import Link from "next/link";
import { Github, Linkedin, ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";
import PostCard from "@/components/blog/PostCard";

export default function Home() {
  const latestPosts = getPublishedPosts().slice(0, 5);

  return (
    <div className="mx-auto max-w-[720px]">
      {/* Hero */}
      <section className="py-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          안녕하세요, JYP입니다
        </h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
          AI, Flutter, 모바일 개발에 대한 이야기를 기록합니다.
        </p>
        <div className="mt-6 flex gap-4">
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
        </div>
      </section>

      {/* Latest posts */}
      <section>
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            최신 글
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
          >
            모든 글 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div>
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <p className="py-8 text-slate-500 dark:text-slate-400">
              아직 작성된 글이 없습니다.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

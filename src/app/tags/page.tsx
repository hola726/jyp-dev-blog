import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "태그별 블로그 포스트 목록",
};

export default function TagsPage() {
  const tags = getAllTags();
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mx-auto max-w-[720px]">
      <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-slate-100">
        태그
      </h1>
      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="text-base text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
          >
            #{tag}
            <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">
              {count}
            </span>
          </Link>
        ))}
      </div>
      {sortedTags.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400">
          아직 태그가 없습니다.
        </p>
      )}
    </div>
  );
}

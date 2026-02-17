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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          태그
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          총 {sortedTags.length}개의 태그
        </p>
      </div>
      {sortedTags.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-800/50"
            >
              <span className="text-base font-medium text-slate-900 group-hover:text-slate-600 dark:text-slate-100 dark:group-hover:text-slate-300">
                #{tag}
              </span>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {count}개의 글
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 dark:text-slate-400">
          아직 태그가 없습니다.
        </p>
      )}
    </div>
  );
}

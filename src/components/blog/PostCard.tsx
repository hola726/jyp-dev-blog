import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { Post } from "@/lib/posts";
import TagList from "./TagList";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group border-b border-slate-200 py-6 dark:border-slate-800">
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-xl font-bold text-slate-900 group-hover:text-slate-600 dark:text-slate-100 dark:group-hover:text-slate-300 transition-colors">
          {post.title}
        </h2>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 line-clamp-3">
          {post.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400 dark:text-slate-500">
          <span>
            {format(new Date(post.date), "yyyy년 M월 d일", { locale: ko })}
          </span>
          <span>·</span>
          <span>{post.readingTime}분 읽기</span>
        </div>
      </Link>
      <div className="mt-3">
        <TagList tags={post.tags} />
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import { getPublishedPosts, getAllTags } from "@/lib/posts";
import PostList from "@/components/blog/PostList";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI, Flutter, 모바일 개발에 대한 기술 블로그 글 목록",
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          전체 글
        </h1>
      </div>
      <PostList posts={posts} tags={tags} />
    </div>
  );
}

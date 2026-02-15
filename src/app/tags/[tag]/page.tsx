import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import PostList from "@/components/blog/PostList";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return Object.keys(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `${tag} 태그가 포함된 블로그 글 목록`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          <span className="text-slate-500 dark:text-slate-400">#{decodedTag}</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          총 {posts.length}개의 글
        </p>
      </div>
      <PostList posts={posts} />
    </div>
  );
}

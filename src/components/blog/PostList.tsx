"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Post } from "@/lib/posts";
import PostCard from "./PostCard";
import { siteConfig } from "@/lib/constants";

export default function PostList({ posts }: { posts: Post[] }) {
  const [displayCount, setDisplayCount] = useState<number>(siteConfig.postsPerPage);
  const loaderRef = useRef<HTMLDivElement>(null);

  const hasMore = displayCount < posts.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) => Math.min(prev + siteConfig.postsPerPage, posts.length));
    }
  }, [hasMore, posts.length]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [loadMore]);

  const visiblePosts = posts.slice(0, displayCount);

  return (
    <div>
      <div className="space-y-0">
        {visiblePosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          더 이상 글이 없습니다
        </p>
      )}
    </div>
  );
}

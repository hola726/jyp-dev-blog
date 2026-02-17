"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Post } from "@/lib/posts";
import PostCard from "./PostCard";
import { siteConfig } from "@/lib/constants";

interface PostListProps {
  posts: Post[];
  tags?: Record<string, number>;
}

export default function PostList({ posts, tags }: PostListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(siteConfig.postsPerPage);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filteredPosts = selectedTag
    ? posts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === selectedTag)
      )
    : posts;

  const hasMore = displayCount < filteredPosts.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) => Math.min(prev + siteConfig.postsPerPage, filteredPosts.length));
    }
  }, [hasMore, filteredPosts.length]);

  useEffect(() => {
    setDisplayCount(siteConfig.postsPerPage);
  }, [selectedTag]);

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

  const visiblePosts = filteredPosts.slice(0, displayCount);

  const sortedTags = tags
    ? Object.entries(tags).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <div>
      {sortedTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              selectedTag === null
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            }`}
          >
            전체 ({posts.length})
          </button>
          {sortedTags.map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                selectedTag === tag
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              #{tag} ({count})
            </button>
          ))}
        </div>
      )}

      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {selectedTag ? `#${selectedTag}` : "전체"} · {filteredPosts.length}개의 글
      </p>

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

      {!hasMore && filteredPosts.length > 0 && (
        <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          더 이상 글이 없습니다
        </p>
      )}

      {filteredPosts.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          해당 태그의 글이 없습니다
        </p>
      )}
    </div>
  );
}

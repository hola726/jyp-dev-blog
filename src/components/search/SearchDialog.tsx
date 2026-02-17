"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { getPublishedPosts, type Post } from "@/lib/posts";
import { createSearchIndex } from "@/lib/search";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const posts = getPublishedPosts();
  const searchIndex = createSearchIndex(posts);

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (value.trim() === "") {
        setResults([]);
        setSelectedIndex(0);
        return;
      }
      const searchResults = searchIndex.search(value);
      setResults(searchResults.map((r) => r.item));
      setSelectedIndex(0);
    },
    [searchIndex]
  );

  const navigateToPost = (slug: string) => {
    handleClose();
    router.push(`/blog/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigateToPost(results[selectedIndex].slug);
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onOpenChange(false), 150);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] transition-opacity duration-150 ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div className="fixed inset-0 bg-black/50" />
      <div
        className={`relative z-10 w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 transition-all duration-150 ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <Search className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="포스트 검색..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500 dark:text-slate-100 dark:placeholder:text-slate-400"
          />
          <button
            onClick={handleClose}
            className="rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto p-2">
            {results.map((post, index) => (
              <li key={post.slug}>
                <button
                  onClick={() => navigateToPost(post.slug)}
                  className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${
                    index === selectedIndex
                      ? "bg-indigo-50 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="text-sm font-medium">{post.title}</div>
                  <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {post.description}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            검색 결과가 없습니다
          </div>
        )}

        <div className="border-t border-slate-200 px-4 py-2 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono dark:border-slate-700">
              ↑↓
            </kbd>
            <span>이동</span>
            <kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono dark:border-slate-700">
              ↵
            </kbd>
            <span>선택</span>
            <kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono dark:border-slate-700">
              esc
            </kbd>
            <span>닫기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

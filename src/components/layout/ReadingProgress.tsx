"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  const isBlogPost = /^\/blog\/[^/]+$/.test(pathname);

  useEffect(() => {
    if (!isBlogPost) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBlogPost]);

  if (!isBlogPost) return null;

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full">
      <div
        className="h-full bg-indigo-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

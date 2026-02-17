"use client";

import { useEffect, useState, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TOC() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  const extractHeadingsFromDOM = useCallback(() => {
    const elements = document.querySelectorAll("article h2, article h3");
    const items: TocItem[] = [];
    elements.forEach((el) => {
      if (el.id && el.textContent) {
        items.push({
          id: el.id,
          text: el.textContent,
          level: el.tagName === "H2" ? 2 : 3,
        });
      }
    });
    return items;
  }, []);

  useEffect(() => {
    const items = extractHeadingsFromDOM();
    setHeadings(items);
  }, [extractHeadingsFromDOM]);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="목차">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
        목차
      </h3>
      <ul className="space-y-1.5 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-0.5 transition-colors ${
                activeId === heading.id
                  ? "text-indigo-600 dark:text-indigo-400 font-medium"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

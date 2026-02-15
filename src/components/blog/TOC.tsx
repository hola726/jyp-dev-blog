"use client";

import { useEffect, useState } from "react";
import { ChevronDown, List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].indexOf(" ");
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, text, level });
  }

  return items;
}

export default function TOC({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const headings = extractHeadings(content);

  useEffect(() => {
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
    <>
      {/* Desktop TOC */}
      <nav className="hidden xl:block" aria-label="목차">
        <div className="sticky top-24">
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
        </div>
      </nav>

      {/* Mobile TOC */}
      <div className="mb-6 xl:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 dark:border-slate-700 dark:text-slate-100"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4" />
            목차
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <ul className="mt-2 space-y-1 rounded-lg border border-slate-200 p-4 text-sm dark:border-slate-700">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

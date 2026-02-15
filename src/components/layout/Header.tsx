"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" },
];

export default function Header({
  onSearchOpen,
}: {
  onSearchOpen: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-sm dark:border-slate-900 dark:bg-neutral-950/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-lg font-semibold text-slate-900 dark:text-slate-100"
        >
          JYP Dev Blog
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={onSearchOpen}
            className="rounded-md p-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="검색"
          >
            <Search className="h-5 w-5" />
          </button>
          <ThemeSwitch />
        </div>

        {/* Mobile nav toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onSearchOpen}
            className="rounded-md p-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="검색"
          >
            <Search className="h-5 w-5" />
          </button>
          <ThemeSwitch />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="메뉴"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white dark:border-slate-900 dark:bg-neutral-950 md:hidden">
          <div className="mx-auto max-w-5xl px-6 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

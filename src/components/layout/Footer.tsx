import Link from "next/link";
import { Github, Rss } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} {siteConfig.author.name}. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/feed.xml"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              aria-label="RSS 피드"
            >
              <Rss className="h-5 w-5" />
            </Link>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

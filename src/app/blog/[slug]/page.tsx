import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPublishedPosts, getPostBySlug, getAdjacentPosts, getRelatedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";
import MDXContent from "@/components/mdx/MDXContent";
import TOC from "@/components/blog/TOC";
import TagList from "@/components/blog/TagList";
import Giscus from "@/components/comments/Giscus";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const relatedPosts = getRelatedPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative mx-auto max-w-[768px]">
        {/* Desktop TOC sidebar - aligned with article top */}
        <aside className="hidden xl:block absolute top-0 left-full ml-10 w-[200px] h-full">
          <div className="sticky top-24">
            <TOC />
          </div>
        </aside>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl leading-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>
              {format(new Date(post.date), "yyyy년 M월 d일", { locale: ko })}
            </span>
            <span>·</span>
            <span>{post.readingTime}분 읽기</span>
          </div>
          <div className="mt-4">
            <TagList tags={post.tags} />
          </div>
        </header>

        {/* Mobile TOC */}
        <div className="mb-10">
          <TOC />
        </div>

        {/* Content */}
        <div className="prose-medium">
          <MDXContent code={post.body} />
        </div>

        {/* Post navigation */}
        <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 dark:border-slate-800">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex items-center gap-2 py-3 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">이전 글</p>
                <p className="mt-1 truncate text-sm font-medium text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100 transition-colors">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex items-center justify-end gap-2 py-3 text-right transition-colors"
            >
              <div className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">다음 글</p>
                <p className="mt-1 truncate text-sm font-medium text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100 transition-colors">
                  {next.title}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100" />
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              관련 글
            </h2>
            <ul className="mt-4 space-y-3">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group block"
                  >
                    <p className="font-medium text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100 transition-colors">
                      {related.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                      {related.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Comments */}
        <section className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <Giscus />
        </section>
      </article>
    </>
  );
}

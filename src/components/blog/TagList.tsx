import Link from "next/link";

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag.toLowerCase()}`}
          className="text-sm text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}

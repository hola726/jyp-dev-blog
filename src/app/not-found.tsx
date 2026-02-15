import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100">
        404
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

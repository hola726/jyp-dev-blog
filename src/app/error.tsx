"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
        오류가 발생했습니다
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        잠시 후 다시 시도해 주세요.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}

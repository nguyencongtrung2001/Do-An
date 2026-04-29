"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 bg-background-light dark:bg-background-dark">
      <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl flex items-center justify-center mb-2">
        <span className="material-symbols-outlined text-4xl">error</span>
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Đã xảy ra lỗi
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
        {error.message || "Có gì đó không ổn. Vui lòng thử lại sau."}
      </p>
      <button
        onClick={reset}
        className="mt-2 px-6 py-2.5 bg-primary text-white font-bold rounded-full text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 active:scale-95"
      >
        Thử lại
      </button>
    </div>
  );
}

export default function RootLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background-light dark:bg-background-dark">
      <div className="w-14 h-14 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
        Đang tải trang...
      </p>
    </div>
  );
}

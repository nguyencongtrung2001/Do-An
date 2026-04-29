export default function UserLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-[60vh]">
      <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
        Đang tải...
      </p>
    </div>
  );
}

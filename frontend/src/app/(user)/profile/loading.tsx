export default function ProfileLoading() {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* Avatar skeleton */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-slate-200 rounded-full animate-pulse mb-4" />
        <div className="h-6 w-36 bg-slate-200 rounded-lg animate-pulse mb-2" />
        <div className="h-5 w-24 bg-slate-100 rounded-full animate-pulse" />
      </div>
      {/* Wallet skeleton */}
      <div className="bg-slate-200 rounded-2xl p-6 h-28 animate-pulse mb-6" />
      {/* Menu skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-gray-800 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-xl" />
              <div className="h-5 w-32 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

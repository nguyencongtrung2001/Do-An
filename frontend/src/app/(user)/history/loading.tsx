export default function HistoryLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse mb-6" />
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
            <div className="h-8 w-12 bg-slate-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
      {/* List skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-100 dark:border-gray-800 animate-pulse">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-slate-200 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-48 bg-slate-200 rounded" />
                <div className="h-4 w-32 bg-slate-100 rounded" />
                <div className="h-4 w-24 bg-slate-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

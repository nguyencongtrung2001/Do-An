export default function AdminLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar skeleton */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="h-6 w-40 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-56 bg-slate-100 rounded-lg animate-pulse mt-2" />
        </div>
        <div className="h-10 w-10 bg-slate-200 rounded-xl animate-pulse" />
      </header>
      {/* Content skeleton */}
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="h-12 w-12 bg-slate-100 rounded-2xl animate-pulse mb-4" />
              <div className="h-7 w-16 bg-slate-200 rounded-lg animate-pulse mb-2" />
              <div className="h-4 w-24 bg-slate-100 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-64 animate-pulse" />
      </div>
    </div>
  );
}

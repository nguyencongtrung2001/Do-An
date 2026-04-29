export default function CourtDetailLoading() {
  return (
    <div className="flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Title skeleton */}
        <div className="mb-8">
          <div className="h-9 w-72 bg-slate-200 rounded-lg animate-pulse mb-3" />
          <div className="h-5 w-96 bg-slate-100 rounded-lg animate-pulse" />
        </div>
        {/* Gallery skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10">
          <div className="col-span-2 row-span-2 bg-slate-200 animate-pulse" />
          <div className="bg-slate-200 animate-pulse" />
          <div className="bg-slate-200 animate-pulse" />
          <div className="bg-slate-200 animate-pulse" />
          <div className="bg-slate-200 animate-pulse" />
        </div>
      </div>
      {/* Booking section skeleton */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-96 animate-pulse" />
    </div>
  );
}

"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-12 animate-in fade-in duration-500">
      {/* Gallery Skeleton */}
      <div className="relative h-[400px] lg:h-[600px] w-full bg-slate-200">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-3/4" />
              <div className="flex flex-wrap gap-4 pt-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-12 w-32 rounded-xl" />
              <Skeleton className="h-12 w-32 rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <section className="w-full bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <Skeleton className="h-8 w-48 mb-8" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex gap-4">
                <Skeleton className="h-24 w-40 rounded-2xl" />
                <Skeleton className="h-24 w-40 rounded-2xl" />
                <Skeleton className="h-24 w-40 rounded-2xl" />
              </div>
              <Skeleton className="h-[400px] w-full rounded-3xl" />
            </div>
            
            <div className="lg:col-span-1">
              <Skeleton className="h-[500px] w-full rounded-3xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// frontend/src/app/page.tsx
"use client";

import React from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import CourtGrid from "@/components/home/CourtGrid";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="grow">
        {/* Phần Hero/Banner */}
        <Hero />
        
        <div className="container mx-auto px-4 py-12 space-y-16">
          {/* Phần danh mục môn thể thao */}
          <Categories />
          
          {/* Danh sách sân nổi bật */}
          <section id="popular-courts" className="scroll-mt-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Sân cầu lông nổi bật</h2>
              <p className="text-slate-500 mt-2">Khám phá những địa điểm được yêu thích nhất tại SportLink</p>
            </div>
            <CourtGrid />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
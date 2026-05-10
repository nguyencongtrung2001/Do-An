// frontend/src/app/page.tsx
"use client";

import React from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import CourtGrid from "@/components/home/CourtGrid";
// Nếu bạn chưa dùng user, có thể tạm bỏ import useAuth
// import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  // Tạm thời comment lại nếu chưa dùng để tránh lỗi "unused-vars"
  // const { user } = useAuth(); 

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="grow">
        {/* Luôn hiển thị giao diện Landing Page cho khách */}
        <Hero />
        
        <div className="container mx-auto px-4 py-12 space-y-16">
          <Categories />
          
          <section id="popular-courts" className="scroll-mt-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Sân cầu lông nổi bật</h2>
              <p className="text-slate-500 mt-2">Khám phá những địa điểm được yêu thích nhất</p>
            </div>
            <CourtGrid />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
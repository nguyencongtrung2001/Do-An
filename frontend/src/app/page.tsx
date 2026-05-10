"use client";

import React from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import CourtGrid from "@/components/home/CourtGrid";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { user, loading } = useAuth();

  // Hiển thị loading đơn giản trong lúc kiểm tra token/session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="grow">
        {/* Giao diện dành cho khách chưa đăng nhập */}
        <Hero />
        
        <div className="container mx-auto px-4 py-8 space-y-16">
          <Categories />
          
          <section id="popular-courts">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Sân cầu lông nổi bật</h2>
                <p className="text-slate-500 mt-2">Khám phá những địa điểm được yêu thích nhất</p>
              </div>
            </div>
            <CourtGrid />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
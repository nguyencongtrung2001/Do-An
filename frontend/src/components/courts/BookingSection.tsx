"use client";

import { useState } from "react";
import { Button } from "../ui/button";

interface BookingSectionProps {
  pricePerSlot: number;
}

export default function BookingSection({ pricePerSlot }: BookingSectionProps) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 mb-20 bg-white dark:bg-[#1a1313] rounded-t-3xl shadow-2xl">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Đặt lịch ngay</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Chọn ngày</h3>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Chọn khung giờ</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {['07:00', '08:00', '09:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map((time) => (
                <button 
                  key={time}
                  className="py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary hover:text-primary transition-all"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Thông tin đặt sân</h3>
            <div className="flex justify-between mb-3 text-slate-600 dark:text-slate-400">
              <span>Giá mỗi 30 phút</span>
              <span className="font-medium">{pricePerSlot.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Tổng cộng</span>
              <span className="font-bold text-primary text-xl">0đ</span>
            </div>
            <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl text-lg shadow-lg shadow-primary/30">
              Xác nhận đặt lịch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

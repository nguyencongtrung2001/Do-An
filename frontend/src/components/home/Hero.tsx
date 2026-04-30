// src/components/home/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-140 flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Image Optimization */}
      <Image
        src="/hero-stadium.png"
        alt="Sân vận động hiện đại"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/80" />

      <div className="relative z-10 text-center max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-white text-4xl sm:text-6xl font-black leading-tight tracking-tight drop-shadow-2xl mb-6">
          Tìm sân gần bạn, <br />
          <span className="text-white">đặt lịch trong 30 giây</span>
        </h1>
        <p className="text-gray-200 text-lg sm:text-xl font-medium max-w-xl mx-auto drop-shadow-md">
          Kết nối với hàng nghìn sân thể thao chất lượng cao trên toàn quốc. Trải nghiệm đặt sân mượt mà nhất.
        </p>
      </div>
    </section>
  );
}
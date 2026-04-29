// src/components/shared/CourtCard.tsx
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface CourtProps {
  id: string | number;
  name: string;
  sport: string;
  rating: number;
  location: string;
  imageUrl: string | StaticImageData;
  slug: string;
  price?: string;
  isHot?: boolean;
}

export default function CourtCard({
  name,
  sport,
  price,
  rating,
  location,
  imageUrl,
  slug,
  isHot
}: CourtProps) {
  return (
    <article className="group flex flex-col bg-white dark:bg-[#2a1d1d] rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
      {/* Image Wrapper - Sử dụng Next/Image để tự động WebP & Lazy Load */}
      <div className="relative w-full aspect-video overflow-hidden">
        {isHot && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] font-black px-2 py-1 rounded shadow-md uppercase">
            Hot
          </div>
        )}
        
        <div className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur-sm text-slate-900 dark:text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-yellow-500 text-sm fill">star</span> 
          {rating.toFixed(1)}
        </div>

        <Image
          src={imageUrl}
          alt={`Sân thể thao ${name} tại ${location}`} // Alt text chứa từ khóa quan trọng
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={false} // Chỉ để true cho các card đầu tiên trên màn hình (LCP)
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <header>
          <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">
            {sport.replace('-', ' ')}
          </p>
          {/* Sử dụng h3 để giữ đúng cấu trúc Outline của trang */}
          <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight group-hover:text-primary transition-colors">
            <Link href={`/courts/${slug}`} title={`Chi tiết ${name}`}>
              {name}
            </Link>
          </h3>
        </header>

        <div className="flex flex-row items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
          <span className="material-symbols-outlined text-sm shrink-0 mt-0.5" aria-hidden="true">
            location_on
          </span>
          <address className="not-italic">{location}</address>
        </div>

        <footer className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Giá từ</span>
            <span className="text-primary font-bold">{price} <span className="text-xs text-slate-500 font-normal">/ giờ</span></span>
          </div>
  
          <Link 
            href={`/courts/${slug}`}
            className="text-primary font-semibold text-xs hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
          >
            Đặt lịch ngay
          </Link>
        </footer>
      </div>
    </article>
  );
}
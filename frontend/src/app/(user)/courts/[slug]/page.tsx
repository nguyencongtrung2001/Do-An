import { notFound } from "next/navigation";
import { MOCK_COURTS } from "@/lib/mock-courts";
import ImageGallery from "@/components/courts/ImageGallery";
import BookingSection from "@/components/courts/BookingSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const court = MOCK_COURTS[slug];
  if (!court) return { title: "Không tìm thấy sân" };
  return {
    title: court.name,
    description: `Đặt sân ${court.name} tại ${court.address}. Giá từ ${court.pricePerSlot.toLocaleString("vi-VN")}đ/30 phút.`,
  };
}

export default async function CourtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const court = MOCK_COURTS[slug];

  if (!court) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Court Header */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
              {court.name}
            </h1>
            <div className="flex flex-row justify-around">
              
          
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                <span>{court.address}</span>
              </div>
              <span className="w-1 h-1 bg-slate-400 rounded-full" />
              <div className="flex items-center gap-1 text-yellow-500">
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="text-slate-900 dark:text-white font-bold">{court.rating}</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal">({court.reviewCount} đánh giá)</span>
              </div>
            </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
                 Đang mở cửa
          </div> </div></div>
          </div>
        </div>

        {/* Image Gallery — Full width */}
        <div className="mb-10">
          <ImageGallery images={court.images} courtName={court.name} />
        </div>
      </div>

      {/* Booking Section — Full width */}
      <BookingSection courts={court.courts} bookedSlots={court.bookedSlots} pricePerSlot={court.pricePerSlot} />
    </div>
  );
}

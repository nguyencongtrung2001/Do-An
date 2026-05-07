
import ImageGallery from "@/components/courts/ImageGallery";
import BookingSection from "@/components/courts/BookingSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return {
    title: `Chi tiết địa điểm ${slug}`,
    description: `Đặt sân tại địa điểm ${slug}.`,
  };
}

export default async function CourtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Create a dummy court object based on the slug (which is actually the location ID)
  // This replaces the MOCK_COURTS dependency and prevents 404 errors when navigating from the map.
  const court = {
    name: `Địa điểm ${slug}`,
    address: "Đang cập nhật địa chỉ...",
    rating: 4.8,
    reviewCount: 125,
    pricePerSlot: 100000,
    images: ["/images/categories/soccer.png", "/images/categories/tennis.png"],
    courts: [],
    bookedSlots: []
  };

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
      <BookingSection pricePerSlot={court.pricePerSlot} />
    </div>
  );
}

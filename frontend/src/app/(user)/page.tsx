import Categories from "@/components/home/Categories";
import CourtGrid from "@/components/home/CourtGrid";
import Hero from "@/components/home/Hero";


export const metadata = {
  title: "Trang chủ — Book Sport",
  description: "Tìm và đặt sân thể thao nhanh chóng. Bóng đá, cầu lông, tennis, pickleball và nhiều hơn nữa.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="layout-container flex flex-col items-center w-full px-4 lg:px-20 pb-20 -mt-8 relative z-10">
        <Categories />
        <CourtGrid />
      </div>
    </>
  );
}

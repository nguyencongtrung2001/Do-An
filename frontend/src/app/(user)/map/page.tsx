import MapWrapper from "@/components/map/MapWrapper";

export const metadata = {
  title: "Bản đồ sân thể thao — Book Sport",
  description: "Tìm kiếm vị trí sân thể thao gần bạn nhất trên bản đồ tương tác.",
};

export default function MapPage() {
  return (
    <div className="flex-1 relative overflow-hidden h-[calc(100vh-73px)]">
      <MapWrapper />
    </div>
  );
}

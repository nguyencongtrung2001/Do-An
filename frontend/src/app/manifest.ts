import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Book Sport — Đặt sân thể thao trực tuyến",
    short_name: "Book Sport",
    description:
      "Nền tảng đặt sân thể thao hàng đầu Việt Nam. Tìm và đặt sân bóng đá, cầu lông, tennis, pickleball nhanh chóng.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6f6",
    theme_color: "#ec1313",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            // "unsafe-none" cần thiết để Google OAuth popup
            // có thể giao tiếp với cửa sổ cha qua postMessage.
            // "same-origin-allow-popups" bị Chrome block với One Tap / FedCM.
            value: isDev ? "unsafe-none" : "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            // Bỏ COEP nếu có – nó block tài nguyên cross-origin cần cho OAuth
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
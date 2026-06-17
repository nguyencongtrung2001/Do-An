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
      {
        protocol: "https",
        hostname: "ui-avatars.com",
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
            
            
            
            value: isDev ? "unsafe-none" : "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
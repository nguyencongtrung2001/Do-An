import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://booksport.vn'),
  title: {
    default: "Book Sport — Đặt sân thể thao trực tuyến",
    template: "%s | Book Sport",
  },
  description: "Nền tảng đặt sân thể thao hàng đầu Việt Nam. Tìm và đặt sân bóng đá, cầu lông, tennis, pickleball nhanh chóng.",
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Book Sport',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Book Sport - Đặt sân thể thao trực tuyến' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`h-full antialiased font-sans ${figtree.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}


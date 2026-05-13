/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="vi" className={`h-full antialiased font-sans ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: { borderRadius: '12px', padding: '12px 16px', fontSize: '14px' },
                success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
              }}
            />
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}


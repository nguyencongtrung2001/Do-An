import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Admin routes
          '/users',
          '/approvals',
          '/finance',
          // Owner routes
          '/dashboard',
          '/status',
          '/bookings',
          // User-private routes
          '/profile',
          '/history',
          '/payment',
        ],
      },
    ],
    sitemap: 'https://booksport.vn/sitemap.xml',
  };
}

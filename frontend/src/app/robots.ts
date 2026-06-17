import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          
          '/users',
          '/approvals',
          '/finance',
          
          '/dashboard',
          '/status',
          '/bookings',
          
          '/profile',
          '/history',
          '/payment',
        ],
      },
    ],
    sitemap: 'https://booksport.vn/sitemap.xml',
  };
}

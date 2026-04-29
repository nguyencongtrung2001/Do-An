import type { MetadataRoute } from 'next';
import { MOCK_COURTS } from '@/lib/mock-courts';

const BASE_URL = 'https://booksport.vn';

export default function sitemap(): MetadataRoute.Sitemap {
  // Dynamic court URLs from data source
  const courtEntries: MetadataRoute.Sitemap = Object.keys(MOCK_COURTS).map(
    (slug) => ({
      url: `${BASE_URL}/courts/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/map`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Dynamic court pages
    ...courtEntries,
    // TODO: Khi có database thực, thay MOCK_COURTS bằng:
    // const courts = await prisma.court.findMany({ select: { slug: true, updatedAt: true } });
  ];
}

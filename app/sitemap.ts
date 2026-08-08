import type { MetadataRoute } from 'next';
import { getIndexablePostSitemapRows } from '../lib/blog-db';
import { siteUrl } from '../lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '/', changeFrequency: 'monthly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/projects', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/experience', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/skills', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ];

  let databasePosts: Awaited<ReturnType<typeof getIndexablePostSitemapRows>> = [];

  try {
    databasePosts = await getIndexablePostSitemapRows();
  } catch (error) {
    console.error('Sitemap database query failed:', error);
  }

  return [
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.path === '/' ? '' : page.path}` || siteUrl,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...databasePosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}

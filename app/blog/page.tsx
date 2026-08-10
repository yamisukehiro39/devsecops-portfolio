import type { Metadata } from 'next';
import { BlogPage } from '../../components/PortfolioClient';
import { getBlogCategories, getPublishedPosts } from '../../lib/blog-db';

export const metadata: Metadata = {
  title: 'DevSecOps & Cybersecurity Blog',
  description:
    'Technical field notes about DevSecOps, cybersecurity, cloud security, Kubernetes, networking, infrastructure and observability.',
  alternates: { canonical: '/blog' },
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const [publicationsResult, categoriesResult] = await Promise.allSettled([
    getPublishedPosts(),
    getBlogCategories(),
  ]);

  if (publicationsResult.status === 'rejected') {
    console.error('Blog publications query failed:', publicationsResult.reason);
  }

  if (categoriesResult.status === 'rejected') {
    console.error('Blog categories query failed:', categoriesResult.reason);
  }

  const publications = publicationsResult.status === 'fulfilled' ? publicationsResult.value : [];
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];

  return <BlogPage publications={publications} categories={categories} />;
}

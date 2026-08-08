import type { Metadata } from 'next';
import { BlogPage } from '../../components/PortfolioClient';
import { getBlogCategories, getPublishedPosts } from '../../lib/blog-db';

export const metadata: Metadata = {
  title: 'Technical Blog',
  description: 'Field notes about cloud security, DevOps, Kubernetes, networks and observability.',
  alternates: { canonical: '/blog' },
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const [publications, categories] = await Promise.all([
    getPublishedPosts(),
    getBlogCategories(),
  ]);

  return <BlogPage publications={publications} categories={categories} />;
}

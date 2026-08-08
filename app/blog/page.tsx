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
  const [publications, categories] = await Promise.all([
    getPublishedPosts(),
    getBlogCategories(),
  ]);

  return <BlogPage publications={publications} categories={categories} />;
}

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AdminPage } from '../../components/PortfolioClient';
import { getCurrentAdmin } from '../../lib/auth/session';
import { getAllPostsForAdmin, getBlogCategories } from '../../lib/blog-db';

export const metadata: Metadata = {
  title: 'Blog Admin',
  robots: { index: false, follow: false },
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/login');
  }

  const [posts, categories] = await Promise.all([
    getAllPostsForAdmin(),
    getBlogCategories(),
  ]);

  return <AdminPage initialPosts={posts} categories={categories} />;
}

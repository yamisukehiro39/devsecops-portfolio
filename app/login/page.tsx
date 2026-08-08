import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { LoginPage } from '../../components/PortfolioClient';
import { getCurrentAdmin } from '../../lib/auth/session';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect('/admin');
  }

  return <LoginPage />;
}

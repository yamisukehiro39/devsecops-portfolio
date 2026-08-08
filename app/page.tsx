import type { Metadata } from 'next';
import { PortfolioHome } from '../components/PortfolioClient';

export const metadata: Metadata = {
  title: 'Othman El-Mansour | DevSecOps & Cloud Security',
  description:
    'Portfolio of Othman El-Mansour, a Network & Telecommunications Systems Engineering student focused on DevSecOps, cloud security, cybersecurity, Kubernetes and networking.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <PortfolioHome />;
}

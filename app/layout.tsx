import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { siteUrl } from '../lib/site';
import './globals.css';

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
const validAdsenseClient = adsenseClient && /^ca-pub-\d+$/.test(adsenseClient) ? adsenseClient : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Othman El-Mansour | Cloud Security & DevOps',
    template: '%s | Othman El-Mansour',
  },
  description:
    'Portfolio and technical field notes by Othman El-Mansour about cloud security, DevOps, Kubernetes, networking and observability.',
  applicationName: 'Othman El-Mansour Portfolio',
  authors: [{ name: 'Othman El-Mansour', url: siteUrl }],
  creator: 'Othman El-Mansour',
  publisher: 'Othman El-Mansour',
  alternates: { canonical: '/' },
  keywords: [
    'Cloud Security',
    'DevOps',
    'DevSecOps',
    'Kubernetes',
    'Networking',
    'Observability',
    'Cybersecurity',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Othman El-Mansour',
    title: 'Othman El-Mansour | Cloud Security & DevOps',
    description: 'Portfolio and technical field notes on secure, observable infrastructure.',
    images: [{ url: '/othman-profile.png', width: 1024, height: 1024, alt: 'Othman El-Mansour' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Othman El-Mansour | Cloud Security & DevOps',
    description: 'Portfolio and technical field notes on secure, observable infrastructure.',
    images: ['/othman-profile.png'],
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#0c1016',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Othman El-Mansour',
  url: siteUrl,
  author: {
    '@type': 'Person',
    name: 'Othman El-Mansour',
    url: siteUrl,
    sameAs: [
      'https://github.com/yamisukehiro39',
      'https://linkedin.com/in/el-mansour-othman',
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
        {validAdsenseClient ? (
          <Script
            id="adsense-loader"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${validAdsenseClient}`}
          />
        ) : null}
      </body>
    </html>
  );
}

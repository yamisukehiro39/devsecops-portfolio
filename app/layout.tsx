import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { siteUrl } from '../lib/site';
import './globals.css';

// const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

const validAdsenseClient = adsenseClient && /^ca-pub-\d+$/.test(adsenseClient) ? adsenseClient : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Othman El-Mansour | DevSecOps & Cloud Security',
    template: '%s | Othman El-Mansour',
  },
  description:
    'Portfolio of Othman El-Mansour focused on DevSecOps, cloud security, cybersecurity, Kubernetes, networking and secure infrastructure.',
  applicationName: 'Othman El-Mansour',
  authors: [{ name: 'Othman El-Mansour', url: siteUrl }],
  creator: 'Othman El-Mansour',
  publisher: 'Othman El-Mansour',
  alternates: { canonical: '/' },
  keywords: [
    'Othman El-Mansour',
    'DevSecOps',
    'Cloud Security',
    'Cybersecurity',
    'DevOps',
    'Kubernetes',
    'Networking',
    'Observability',
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
    title: 'Othman El-Mansour | DevSecOps & Cloud Security',
    description:
      'Portfolio and technical field notes about DevSecOps, cloud security, cybersecurity, Kubernetes and networking.',
    images: [{ url: '/othman-profile.png', width: 1024, height: 1024, alt: 'Othman El-Mansour' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Othman El-Mansour | DevSecOps & Cloud Security',
    description:
      'Portfolio and technical field notes about DevSecOps, cloud security, cybersecurity, Kubernetes and networking.',
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

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Othman El-Mansour',
  url: siteUrl,
  image: `${siteUrl}/othman-profile.png`,
  jobTitle: 'Network & Telecommunications Systems Engineering Student',
  sameAs: [
    'https://github.com/yamisukehiro39',
    'https://linkedin.com/in/el-mansour-othman',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'Othman El-Mansour',
  alternateName: '0thman.tech',
  url: siteUrl,
  publisher: {
    '@id': `${siteUrl}/#person`,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
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

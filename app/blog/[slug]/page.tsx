import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '../../../components/PortfolioClient';
import { getPublishedPostBySlug } from '../../../lib/blog-db';
import type { BlogPublication } from '../../../lib/blog-data';
import { absoluteSiteUrl, canonicalArticleUrl, siteUrl } from '../../../lib/site';

type Props = { params: Promise<{ slug: string }> };

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function displayDateToIso(date?: string) {
  if (!date) return undefined;
  const [day, month, year] = date.split('.').map(Number);
  if (!day || !month || !year) return undefined;
  return new Date(Date.UTC(year, month - 1, day)).toISOString();
}

function socialImageFor(post: BlogPublication) {
  // Prefer the cover that is actually rendered on the article. This avoids an
  // old/broken OG URL taking precedence over a valid cover image.
  return absoluteSiteUrl(post.image?.trim() || post.ogImageUrl?.trim() || '/othman-profile.png');
}

function buildArticleJsonLd(post: BlogPublication, routeSlug: string) {
  const canonical = canonicalArticleUrl(post.slug?.trim() || routeSlug, post.canonicalUrl);
  const image = socialImageFor(post);
  const published = displayDateToIso(post.date);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle?.trim() || post.title,
    description: post.seoDescription?.trim() || post.excerpt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    ...(image ? { image: [image] } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : published ? { dateModified: published } : {}),
    author: { '@type': 'Person', name: 'Othman El-Mansour', url: siteUrl },
    publisher: { '@type': 'Person', name: 'Othman El-Mansour', url: siteUrl },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    url: canonical,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: 'Field Note',
      robots: { index: false, follow: false },
    };
  }

  const title = post.seoTitle?.trim() || post.title;
  const description = post.seoDescription?.trim() || post.excerpt;
  const canonical = canonicalArticleUrl(post.slug?.trim() || slug, post.canonicalUrl);
  const socialImage = socialImageFor(post);
  const published = displayDateToIso(post.date);

  return {
    title,
    description,
    keywords: post.tags,
    alternates: { canonical },
    robots: post.noindex
      ? { index: false, follow: false }
      : {
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
      type: 'article',
      title,
      description,
      url: canonical,
      siteName: 'Othman El-Mansour',
      locale: 'en_US',
      publishedTime: published,
      modifiedTime: post.updatedAt || published,
      authors: ['Othman El-Mansour'],
      tags: post.tags,
      images: socialImage ? [{ url: socialImage, alt: post.imageAlt || post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const publication = await getPublishedPostBySlug(slug);

  if (!publication) {
    notFound();
  }

  const jsonLd = buildArticleJsonLd(publication, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ArticlePage publication={publication} />
    </>
  );
}

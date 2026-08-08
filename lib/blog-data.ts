export type BlogPublication = {
  id?: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  featured?: boolean;
  href?: string;
  slug?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  noindex?: boolean;
  status?: 'draft' | 'published' | 'archived';
  updatedAt?: string;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

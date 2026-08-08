-- SEO fields used by the Next.js publication editor and generateMetadata().
-- The main schema already includes most of these columns; IF NOT EXISTS keeps this safe to rerun.

ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS seo_description VARCHAR(320),
  ADD COLUMN IF NOT EXISTS canonical_url TEXT,
  ADD COLUMN IF NOT EXISTS og_image_url TEXT,
  ADD COLUMN IF NOT EXISTS cover_image_alt VARCHAR(255),
  ADD COLUMN IF NOT EXISTS noindex BOOLEAN NOT NULL DEFAULT FALSE;

-- Slug must remain unique because it is the public URL identifier.
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique_idx
ON blog_posts(slug);

-- Useful for quickly listing only indexable published articles for sitemap generation.
CREATE INDEX IF NOT EXISTS blog_posts_indexable_idx
ON blog_posts(status, noindex, published_at DESC);

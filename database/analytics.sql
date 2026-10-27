-- Visitor and publication-view analytics for the private admin panel.
-- Run once in pgAdmin or through your PostgreSQL migration workflow.

CREATE TABLE IF NOT EXISTS site_visitors (
  id BIGSERIAL PRIMARY KEY,
  ip_address TEXT NOT NULL UNIQUE,
  user_agent TEXT,
  country_code VARCHAR(2),
  country_name VARCHAR(100),
  city VARCHAR(150),
  region VARCHAR(150),
  timezone VARCHAR(100),
  isp TEXT,
  asn VARCHAR(40),
  geolocated_at TIMESTAMPTZ,
  first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  page_views INTEGER NOT NULL DEFAULT 1 CHECK (page_views >= 1)
);

-- Safe upgrade for databases where site_visitors already exists.
ALTER TABLE site_visitors
  ADD COLUMN IF NOT EXISTS country_code VARCHAR(2),
  ADD COLUMN IF NOT EXISTS country_name VARCHAR(100),
  ADD COLUMN IF NOT EXISTS city VARCHAR(150),
  ADD COLUMN IF NOT EXISTS region VARCHAR(150),
  ADD COLUMN IF NOT EXISTS timezone VARCHAR(100),
  ADD COLUMN IF NOT EXISTS isp TEXT,
  ADD COLUMN IF NOT EXISTS asn VARCHAR(40),
  ADD COLUMN IF NOT EXISTS geolocated_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS publication_views (
  id BIGSERIAL PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  visitor_id BIGINT REFERENCES site_visitors(id) ON DELETE SET NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS site_visitors_last_seen_idx
ON site_visitors(last_seen DESC);

CREATE INDEX IF NOT EXISTS publication_views_post_id_idx
ON publication_views(post_id);

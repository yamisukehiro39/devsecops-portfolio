# Othman El-Mansour Portfolio — Next.js + PostgreSQL

This version keeps the existing visual design while moving the blog and admin publication workflow to PostgreSQL.

## What is database-backed now

- `/blog` reads published publications and categories from PostgreSQL on the server.
- `/blog/[slug]` reads the article from PostgreSQL and generates SEO metadata from the database record.
- `/sitemap.xml` reads indexable published posts from PostgreSQL.
- `/admin` reads drafts and published posts from PostgreSQL.
- The admin editor creates, updates, publishes, unpublishes (save as draft), and deletes database publications through authenticated API routes.
- Tags are stored in `tags` + `blog_post_tags`.
- The category selector reads directly from the `categories` table.
- Browser `localStorage` is no longer used for blog publications.

## Confirmation dialogs

Admin action buttons now require confirmation before executing an action, including:

- New field note
- Edit publication
- Save draft
- Publish publication
- Delete publication
- Log out

Deletion uses a destructive confirmation style.

## Required database migration

If the `blog_posts` table was created before the SEO fields were added, run this once in pgAdmin:

```sql
-- database/seo-publication-fields.sql
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS seo_description VARCHAR(320),
  ADD COLUMN IF NOT EXISTS canonical_url TEXT,
  ADD COLUMN IF NOT EXISTS og_image_url TEXT,
  ADD COLUMN IF NOT EXISTS cover_image_alt VARCHAR(255),
  ADD COLUMN IF NOT EXISTS noindex BOOLEAN NOT NULL DEFAULT FALSE;

CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique_idx
ON blog_posts(slug);

CREATE INDEX IF NOT EXISTS blog_posts_indexable_idx
ON blog_posts(status, noindex, published_at DESC);
```

The rest of the application expects the previously created tables:

`admins`, `admin_sessions`, `categories`, `blog_posts`, `blog_images`, `tags`, `blog_post_tags`.

## Environment

Copy `.env.example` to `.env.local` and put the real values only in `.env.local`.

```bash
cp .env.example .env.local
```

For Heroku PostgreSQL, keep:

```env
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

Generate the JWT secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

Never commit `.env.local`.

## Run

```bash
npm install
npm run dev
```

## Publication API

Public:

- `GET /api/posts`
- `GET /api/posts/[slug]`

JWT/session protected:

- `GET /api/admin/posts`
- `POST /api/admin/posts`
- `PUT /api/admin/posts/[id]`
- `DELETE /api/admin/posts/[id]`

## SEO

Published database articles provide server-rendered title, description, canonical URL, robots settings, Open Graph/Twitter metadata and `BlogPosting` JSON-LD. Posts with `noindex = true` are excluded from the sitemap.

The HTML editor is intended for trusted admin content. For a larger multi-user CMS, add server-side HTML sanitization and store uploaded images in persistent object storage rather than inline Base64 data.

## Production / Heroku

The repository includes `Procfile`, `.slugignore`, `app.json`, canonical-host redirects, `robots.txt`, a database-backed `sitemap.xml`, article JSON-LD and `X-Robots-Tag` protection for admin/API routes.

See `HEROKU.md` for the deployment checklist. The local `.env.local` file is intentionally kept for testing and should not be committed or used as the production secret source.

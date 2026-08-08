# Changes in this handoff

## SEO / indexing
- Centralized the canonical public origin in `lib/site.ts`.
- Normalized article canonical URLs to `https://www.0thman.tech`.
- Normalized local Open Graph URLs when an old DB row uses the non-www domain.
- Added global index/follow metadata and WebSite/Person JSON-LD.
- Improved article `BlogPosting` JSON-LD and social image fallback.
- Updated `robots.txt` generation to allow the public site and disallow admin/login/API routes.
- Updated the dynamic sitemap to include only published/indexable DB posts and always emit the canonical production host.
- Added `X-Robots-Tag` headers for admin, login and API routes.
- Added a permanent redirect from `0thman.tech` to `www.0thman.tech` when the request reaches Next.js.

## Mobile responsive fixes
- Corrected the portrait cascade that forced a 550px image on phones.
- Added phone-safe portrait sizing and badge sizing.
- Centered every mobile navigation item, including the Blog link.

## Blog filters
- Redesigned the search and category controls as a compact responsive filter panel.
- Added clear-search action inside the search field.
- Preserved the existing filtering logic and PostgreSQL category source.

## Heroku
- `Procfile`: `web: npm start`.
- `npm start`: `next start` so Heroku's `PORT` is used automatically.
- Added `.slugignore`, `app.json`, and `HEROKU.md`.
- Removed the local `.next` cache from the handoff; Heroku rebuilds it.
- `.env.local` was intentionally left byte-for-byte unchanged for local DB testing.

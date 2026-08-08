# Heroku deployment checklist

The project is prepared to run with the Heroku Node.js buildpack.

## 1. Keep local test configuration local

`.env.local` is intentionally left unchanged for local testing. It is ignored by Git and by `.slugignore`, so do not rely on it in production.

On Heroku, configure the same values as Config Vars instead.

Required production values:

- `NEXT_PUBLIC_SITE_URL=https://www.0thman.tech`
- `DATABASE_URL=<your PostgreSQL URL>`
- `DATABASE_SSL=true`
- `DATABASE_SSL_REJECT_UNAUTHORIZED=false`
- `DATABASE_POOL_MAX=10`
- `JWT_SECRET=<long random secret>`
- `JWT_EXPIRES_IN_SECONDS=86400`
- `JWT_ISSUER=0thman.tech`
- `JWT_AUDIENCE=portfolio-admin`

Optional:

- `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...` only after a real Google AdSense publisher ID is available.

## 2. Build and start

Heroku installs dependencies from `package-lock.json`, runs the Next.js build, then starts the web process from `Procfile`:

```text
web: npm start
```

`npm start` runs `next start`, which automatically uses Heroku's `PORT` environment variable.

## 3. Domain and canonical host

The canonical origin is `https://www.0thman.tech`.

The Next.js configuration redirects requests received for `0thman.tech` to `www.0thman.tech`. DNS still needs to point both desired hostnames to the correct Heroku/custom-domain configuration.

## 4. After deployment

Verify these public URLs return HTTP 200:

- `/`
- `/blog`
- `/robots.txt`
- `/sitemap.xml`
- one published `/blog/<slug>` article

Verify `/admin` and `/login` send an `X-Robots-Tag: noindex, nofollow, noarchive` response header.

Then add the domain to Google Search Console and submit:

```text
https://www.0thman.tech/sitemap.xml
```

## 5. Images

Heroku's runtime filesystem is ephemeral. Static files committed under `public/` are fine, but future admin uploads should use persistent object storage/CDN (for example Cloudinary or S3-compatible storage) and save only the resulting URL in PostgreSQL.

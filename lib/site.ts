const DEFAULT_SITE_URL = 'https://www.0thman.tech';

function normalizeSiteUrl(value?: string) {
  const candidate = value?.trim() || DEFAULT_SITE_URL;

  try {
    const url = new URL(candidate);
    return url.origin.replace(/\/$/, '');
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteSiteUrl(value?: string) {
  if (!value?.trim()) return undefined;

  const candidate = value.trim();

  try {
    const parsed = new URL(candidate, `${siteUrl}/`);

    // Keep local assets on the canonical origin even if an old database row
    // still contains the non-www version of the domain.
    if (parsed.hostname === '0thman.tech' || parsed.hostname === 'www.0thman.tech') {
      const canonicalOrigin = new URL(siteUrl);
      parsed.protocol = canonicalOrigin.protocol;
      parsed.host = canonicalOrigin.host;
    }

    return parsed.toString();
  } catch {
    return undefined;
  }
}

export function canonicalArticleUrl(slug: string, storedCanonical?: string) {
  const fallback = new URL(`/blog/${slug}`, `${siteUrl}/`).toString();
  if (!storedCanonical?.trim()) return fallback;

  try {
    const parsed = new URL(storedCanonical.trim(), `${siteUrl}/`);
    const canonicalOrigin = new URL(siteUrl);
    parsed.protocol = canonicalOrigin.protocol;
    parsed.host = canonicalOrigin.host;
    parsed.hash = '';
    return parsed.toString();
  } catch {
    return fallback;
  }
}

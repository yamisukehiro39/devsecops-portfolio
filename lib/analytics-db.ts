import { getDb } from './db';

export type VisitorRecord = {
  ipAddress: string;
  userAgent: string | null;
  countryCode: string | null;
  countryName: string | null;
  city: string | null;
  region: string | null;
  timezone: string | null;
  isp: string | null;
  asn: string | null;
  firstSeen: string;
  lastSeen: string;
  pageViews: number;
};

export type PublicationViewRecord = {
  id: string;
  title: string;
  slug: string;
  views: number;
};

export type IndividualPublicationViewRecord = {
  id: string;
  title: string;
  slug: string;
  ipAddress: string | null;
  countryName: string | null;
  city: string | null;
  isp: string | null;
  viewedAt: string;
};

export type AdminAnalytics = {
  totalVisitors: number;
  totalPageViews: number;
  recentVisitors: VisitorRecord[];
  publicationViews: PublicationViewRecord[];
  recentPublicationViews: IndividualPublicationViewRecord[];
};

function dateToIso(value: Date | string) {
  return (value instanceof Date ? value : new Date(value)).toISOString();
}

type IpLocation = {
  countryCode: string | null;
  countryName: string | null;
  city: string | null;
  region: string | null;
  timezone: string | null;
  isp: string | null;
  asn: string | null;
};

function countryNameFromCode(code: string | null) {
  if (!code) return null;
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

async function lookupIpLocation(ipAddress: string): Promise<IpLocation | null> {
  if (ipAddress === '127.0.0.1' || ipAddress === '::1') return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(
      `https://api.country.is/${encodeURIComponent(ipAddress)}?fields=city,subdivision,location,asn`,
      { signal: controller.signal, cache: 'no-store' },
    );
    if (!response.ok) return null;

    const data = await response.json() as {
      country?: string;
      city?: string;
      subdivision?: string;
      location?: { time_zone?: string };
      asn?: { number?: number; organization?: string };
    };
    const countryCode = data.country?.toUpperCase() ?? null;

    return {
      countryCode,
      countryName: countryNameFromCode(countryCode),
      city: data.city ?? null,
      region: data.subdivision ?? null,
      timezone: data.location?.time_zone ?? null,
      isp: data.asn?.organization ?? null,
      asn: data.asn?.number ? `AS${data.asn.number}` : null,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function recordVisit({
  ipAddress,
  userAgent,
  articleSlug,
}: {
  ipAddress: string;
  userAgent: string | null;
  articleSlug?: string;
}) {
  const visitor = await getDb().query<{ id: string; needs_geolocation: boolean }>(
    `
      INSERT INTO site_visitors (ip_address, user_agent, first_seen, last_seen, page_views)
      VALUES ($1, $2, NOW(), NOW(), 1)
      ON CONFLICT (ip_address)
      DO UPDATE SET
        user_agent = EXCLUDED.user_agent,
        last_seen = NOW(),
        page_views = site_visitors.page_views + 1
      RETURNING id, (geolocated_at IS NULL) AS needs_geolocation
    `,
    [ipAddress, userAgent],
  );

  if (visitor.rows[0]?.needs_geolocation) {
    const location = await lookupIpLocation(ipAddress);
    if (location) {
      await getDb().query(
        `
          UPDATE site_visitors
          SET country_code = $2,
              country_name = $3,
              city = $4,
              region = $5,
              timezone = $6,
              isp = $7,
              asn = $8,
              geolocated_at = NOW()
          WHERE id = $1
        `,
        [
          visitor.rows[0].id,
          location.countryCode,
          location.countryName,
          location.city,
          location.region,
          location.timezone,
          location.isp,
          location.asn,
        ],
      );
    }
  }

  if (!articleSlug || !visitor.rows[0]) return;

  await getDb().query(
    `
      INSERT INTO publication_views (post_id, visitor_id)
      SELECT bp.id, $1
      FROM blog_posts bp
      WHERE bp.slug = $2
        AND bp.status = 'published'
    `,
    [visitor.rows[0].id, articleSlug],
  );
}

export async function getAdminAnalytics(): Promise<AdminAnalytics> {
  const [totalsResult, visitorsResult, individualViewsResult, publicationsResult] = await Promise.all([
    getDb().query<{ total_visitors: string; total_page_views: string }>(
      `
        SELECT
          COUNT(*)::text AS total_visitors,
          COALESCE(SUM(page_views), 0)::text AS total_page_views
        FROM site_visitors
      `,
    ),
    getDb().query<{
      ip_address: string;
      user_agent: string | null;
      country_code: string | null;
      country_name: string | null;
      city: string | null;
      region: string | null;
      timezone: string | null;
      isp: string | null;
      asn: string | null;
      first_seen: Date | string;
      last_seen: Date | string;
      page_views: number;
    }>(
      `
        SELECT ip_address, user_agent, country_code, country_name, city, region,
               timezone, isp, asn, first_seen, last_seen, page_views
        FROM site_visitors
        ORDER BY last_seen DESC
        LIMIT 25
      `,
    ),
    getDb().query<{
      id: string;
      title: string;
      slug: string;
      ip_address: string | null;
      country_name: string | null;
      city: string | null;
      isp: string | null;
      viewed_at: Date | string;
    }>(
      `
        SELECT pv.id, bp.title, bp.slug, sv.ip_address, sv.country_name,
               sv.city, sv.isp, pv.viewed_at
        FROM publication_views pv
        JOIN blog_posts bp ON bp.id = pv.post_id
        LEFT JOIN site_visitors sv ON sv.id = pv.visitor_id
        ORDER BY pv.viewed_at DESC
        LIMIT 100
      `,
    ),
    getDb().query<{
      id: string;
      title: string;
      slug: string;
      views: string;
    }>(
      `
        SELECT bp.id, bp.title, bp.slug, COUNT(pv.id)::text AS views
        FROM blog_posts bp
        LEFT JOIN publication_views pv ON pv.post_id = bp.id
        WHERE bp.status = 'published'
        GROUP BY bp.id, bp.title, bp.slug
        ORDER BY COUNT(pv.id) DESC, bp.title ASC
      `,
    ),
  ]);

  const totals = totalsResult.rows[0];

  return {
    totalVisitors: Number(totals?.total_visitors ?? 0),
    totalPageViews: Number(totals?.total_page_views ?? 0),
    recentVisitors: visitorsResult.rows.map((visitor) => ({
      ipAddress: visitor.ip_address,
      userAgent: visitor.user_agent,
      countryCode: visitor.country_code,
      countryName: visitor.country_name,
      city: visitor.city,
      region: visitor.region,
      timezone: visitor.timezone,
      isp: visitor.isp,
      asn: visitor.asn,
      firstSeen: dateToIso(visitor.first_seen),
      lastSeen: dateToIso(visitor.last_seen),
      pageViews: Number(visitor.page_views),
    })),
    publicationViews: publicationsResult.rows.map((publication) => ({
      id: publication.id,
      title: publication.title,
      slug: publication.slug,
      views: Number(publication.views),
    })),
    recentPublicationViews: individualViewsResult.rows.map((view) => ({
      id: view.id,
      title: view.title,
      slug: view.slug,
      ipAddress: view.ip_address,
      countryName: view.country_name,
      city: view.city,
      isp: view.isp,
      viewedAt: dateToIso(view.viewed_at),
    })),
  };
}

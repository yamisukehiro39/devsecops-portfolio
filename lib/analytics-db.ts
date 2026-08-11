import { getDb } from './db';

export type VisitorRecord = {
  ipAddress: string;
  userAgent: string | null;
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

export async function recordVisit({
  ipAddress,
  userAgent,
  articleSlug,
}: {
  ipAddress: string;
  userAgent: string | null;
  articleSlug?: string;
}) {
  const visitor = await getDb().query<{ id: string }>(
    `
      INSERT INTO site_visitors (ip_address, user_agent, first_seen, last_seen, page_views)
      VALUES ($1, $2, NOW(), NOW(), 1)
      ON CONFLICT (ip_address)
      DO UPDATE SET
        user_agent = EXCLUDED.user_agent,
        last_seen = NOW(),
        page_views = site_visitors.page_views + 1
      RETURNING id
    `,
    [ipAddress, userAgent],
  );

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
      first_seen: Date | string;
      last_seen: Date | string;
      page_views: number;
    }>(
      `
        SELECT ip_address, user_agent, first_seen, last_seen, page_views
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
      viewed_at: Date | string;
    }>(
      `
        SELECT pv.id, bp.title, bp.slug, sv.ip_address, pv.viewed_at
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
      viewedAt: dateToIso(view.viewed_at),
    })),
  };
}

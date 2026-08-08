import type { PoolClient } from "pg";
import { getDb } from "./db";
import { absoluteSiteUrl, canonicalArticleUrl } from "./site";
import type {
  BlogCategory,
  BlogPublication,
} from "./blog-data";

export type BlogPostInput = {
  title: string;
  slug?: string;
  category: string;
  excerpt?: string;
  tags?: string[];
  content?: string;
  image?: string;
  imageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  noindex?: boolean;
  featured?: boolean;
  status: 'draft' | 'published';
};

type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_html: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  noindex: boolean;
  published_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  category: string | null;
  tags: string[] | null;
};

function toDate(value: Date | string | null | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value: Date | string | null | undefined) {
  const date = toDate(value) ?? new Date();
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(date)
    .replaceAll('/', '.');
}

function estimateReadTime(content: string) {
  const plain = content.replace(/<[^>]*>/g, ' ');
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 210)).toString().padStart(2, '0')} min read`;
}

function mapPost(row: BlogPostRow): BlogPublication {
  const dateSource = row.published_at ?? row.created_at;
  const updated = toDate(row.updated_at);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    href: `/blog/${row.slug}`,
    category: row.category ?? 'Uncategorized',
    date: formatDate(dateSource),
    readTime: estimateReadTime(row.content_html ?? ''),
    excerpt: row.excerpt ?? '',
    tags: row.tags ?? [],
    featured: row.featured,
    content: row.content_html ?? '',
    image: row.cover_image_url ?? undefined,
    imageAlt: row.cover_image_alt ?? row.title,
    seoTitle: row.seo_title ?? row.title,
    seoDescription: row.seo_description ?? row.excerpt ?? '',
    canonicalUrl: row.canonical_url ?? undefined,
    ogImageUrl: row.og_image_url ?? undefined,
    noindex: row.noindex,
    status: row.status,
    updatedAt: updated?.toISOString(),
  };
}

const baseSelect = `
  SELECT
    bp.id,
    bp.title,
    bp.slug,
    bp.excerpt,
    bp.content_html,
    bp.cover_image_url,
    bp.cover_image_alt,
    bp.status,
    bp.featured,
    bp.seo_title,
    bp.seo_description,
    bp.canonical_url,
    bp.og_image_url,
    bp.noindex,
    bp.published_at,
    bp.created_at,
    bp.updated_at,
    c.name AS category,
    COALESCE(
      (
        SELECT ARRAY_AGG(t.name ORDER BY t.name)
        FROM blog_post_tags bpt
        JOIN tags t ON t.id = bpt.tag_id
        WHERE bpt.post_id = bp.id
      ),
      ARRAY[]::text[]
    ) AS tags
  FROM blog_posts bp
  LEFT JOIN categories c ON c.id = bp.category_id
`;

export function slugifyPost(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 255) || `field-note-${Date.now()}`;
}

export async function getPublishedPosts(): Promise<BlogPublication[]> {
  const result = await getDb().query<BlogPostRow>(
    `${baseSelect}
      WHERE bp.status = 'published'
      ORDER BY bp.featured DESC, bp.published_at DESC NULLS LAST, bp.created_at DESC
    `,
  );
  return result.rows.map(mapPost);
}

export async function getAllPostsForAdmin(): Promise<BlogPublication[]> {
  const result = await getDb().query<BlogPostRow>(
    `${baseSelect}
      ORDER BY bp.updated_at DESC, bp.created_at DESC
    `,
  );
  return result.rows.map(mapPost);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPublication | null> {
  const result = await getDb().query<BlogPostRow>(
    `${baseSelect}
      WHERE bp.slug = $1
        AND bp.status = 'published'
      LIMIT 1
    `,
    [slug],
  );
  return result.rows[0] ? mapPost(result.rows[0]) : null;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const result = await getDb().query<BlogCategory>(
    `
      SELECT id, name, slug, description
      FROM categories
      ORDER BY name ASC
    `,
  );
  return result.rows;
}

export async function getIndexablePostSitemapRows() {
  const result = await getDb().query<{
    slug: string;
    canonical_url: string | null;
    updated_at: Date | string;
  }>(
    `
      SELECT slug, canonical_url, updated_at
      FROM blog_posts
      WHERE status = 'published'
        AND noindex = FALSE
      ORDER BY published_at DESC NULLS LAST, created_at DESC
    `,
  );

  return result.rows.map((row: { slug: string; canonical_url: string | null; updated_at: Date | string }) => ({
    slug: row.slug,
    canonicalUrl: row.canonical_url,
    updatedAt: toDate(row.updated_at) ?? new Date(),
  }));
}

async function resolveCategoryId(client: PoolClient, category: string) {
  const categoryResult = await client.query<{ id: string }>(
    `SELECT id FROM categories WHERE LOWER(name) = LOWER($1) LIMIT 1`,
    [category],
  );
  return categoryResult.rows[0]?.id ?? null;
}

async function replacePostTags(
  client: PoolClient,
  postId: string,
  tagNames: string[],
) {
  await client.query('DELETE FROM blog_post_tags WHERE post_id = $1::uuid', [postId]);

  const uniqueTags = Array.from(new Set(tagNames.map((tag) => tag.trim()).filter(Boolean)));
  for (const name of uniqueTags) {
    const slug = slugifyPost(name);
    const tagResult = await client.query<{ id: string }>(
      `
        INSERT INTO tags (name, slug)
        VALUES ($1, $2)
        ON CONFLICT (slug)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id
      `,
      [name, slug],
    );

    await client.query(
      `
        INSERT INTO blog_post_tags (post_id, tag_id)
        VALUES ($1::uuid, $2::uuid)
        ON CONFLICT DO NOTHING
      `,
      [postId, tagResult.rows[0].id],
    );
  }
}

export async function createBlogPost(input: BlogPostInput, authorId: string) {
  const client = await getDb().connect();
  try {
    await client.query('BEGIN');
    const categoryId = await resolveCategoryId(client, input.category);
    if (!categoryId) {
      const error = new Error('Selected category does not exist.');
      (error as Error & { code?: string }).code = 'CATEGORY_NOT_FOUND';
      throw error;
    }

    const slug = slugifyPost(input.slug?.trim() || input.title);

    const publishedAt =
    input.status === "published"
      ? new Date()
      : null;

    const result = await client.query<{ id: string }>(
  `
    INSERT INTO blog_posts (
      author_id,
      category_id,
      title,
      slug,
      excerpt,
      content_html,
      cover_image_url,
      cover_image_alt,
      status,
      featured,
      seo_title,
      seo_description,
      canonical_url,
      og_image_url,
      noindex,
      published_at
    )
    VALUES (
      $1::uuid,
      $2::uuid,
      $3::varchar(255),
      $4::varchar(255),
      $5::text,
      $6::text,
      NULLIF($7::text, ''),
      NULLIF($8::varchar(255), ''),
      $9::varchar(20),
      $10::boolean,
      NULLIF($11::varchar(255), ''),
      NULLIF($12::varchar(320), ''),
      NULLIF($13::text, ''),
      NULLIF($14::text, ''),
      $15::boolean,
      $16::timestamptz
    )
    RETURNING id
  `,
  [
    authorId,
    categoryId,
    input.title.trim(),
    slug,
    input.excerpt?.trim() ?? "",
    input.content?.trim() ?? "",
    input.image?.trim() ?? "",
    input.imageAlt?.trim() ?? "",
    input.status,
    Boolean(input.featured),
    input.seoTitle?.trim() ?? "",
    input.seoDescription?.trim() ?? "",
    canonicalArticleUrl(slug, input.canonicalUrl),
    absoluteSiteUrl(input.ogImageUrl)?.trim() ?? "",
    Boolean(input.noindex),
    publishedAt,
  ],
);

    await replacePostTags(client, result.rows[0].id, input.tags ?? []);
    await client.query('COMMIT');
    return result.rows[0].id;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function updateBlogPost(
  id: string,
  input: BlogPostInput,
  authorId: string,
) {
  const client = await getDb().connect();

  try {
    await client.query("BEGIN");

    // ========================================================
    // CATEGORY
    // ========================================================

    const categoryId =
      await resolveCategoryId(
        client,
        input.category,
      );

    if (!categoryId) {
      const error = new Error(
        "Selected category does not exist.",
      );

      (
        error as Error & {
          code?: string;
        }
      ).code = "CATEGORY_NOT_FOUND";

      throw error;
    }

    // ========================================================
    // SLUG
    // ========================================================

    const slug = slugifyPost(
      input.slug?.trim() ||
        input.title,
    );

    // ========================================================
    // PUBLISHED DATE
    //
    // On ne réutilise plus $10 dans PostgreSQL.
    // Cela évite l'erreur :
    // inconsistent types deduced for parameter $10
    // ========================================================

    const publishedAt =
      input.status === "published"
        ? new Date()
        : null;

    // ========================================================
    // UPDATE POST
    // ========================================================

    const result =
      await client.query<{
        id: string;
      }>(
        `
          UPDATE blog_posts

          SET
            author_id =
              $2::uuid,

            category_id =
              $3::uuid,

            title =
              $4::varchar(255),

            slug =
              $5::varchar(255),

            excerpt =
              $6::text,

            content_html =
              $7::text,

            cover_image_url =
              NULLIF(
                $8::text,
                ''
              ),

            cover_image_alt =
              NULLIF(
                $9::varchar(255),
                ''
              ),

            status =
              $10::varchar(20),

            featured =
              $11::boolean,

            seo_title =
              NULLIF(
                $12::varchar(255),
                ''
              ),

            seo_description =
              NULLIF(
                $13::varchar(320),
                ''
              ),

            canonical_url =
              NULLIF(
                $14::text,
                ''
              ),

            og_image_url =
              NULLIF(
                $15::text,
                ''
              ),

            noindex =
              $16::boolean,

            published_at =
              COALESCE(
                published_at,
                $17::timestamptz
              )

          WHERE
            id = $1::uuid

          RETURNING id
        `,
        [
          // $1
          id,

          // $2
          authorId,

          // $3
          categoryId,

          // $4
          input.title.trim(),

          // $5
          slug,

          // $6
          input.excerpt?.trim() ??
            "",

          // $7
          input.content?.trim() ??
            "",

          // $8
          input.image?.trim() ??
            "",

          // $9
          input.imageAlt?.trim() ??
            "",

          // $10
          input.status,

          // $11
          Boolean(
            input.featured,
          ),

          // $12
          input.seoTitle?.trim() ??
            "",

          // $13
          input.seoDescription?.trim() ??
            "",

          // $14
          canonicalArticleUrl(slug, input.canonicalUrl),

          // $15
          absoluteSiteUrl(input.ogImageUrl)?.trim() ??
            "",

          // $16
          Boolean(
            input.noindex,
          ),

          // $17
          publishedAt,
        ],
      );

    // ========================================================
    // POST NOT FOUND
    // ========================================================

    if (!result.rows[0]) {
      const error = new Error(
        "Publication not found.",
      );

      (
        error as Error & {
          code?: string;
        }
      ).code = "POST_NOT_FOUND";

      throw error;
    }

    // ========================================================
    // UPDATE TAGS
    // ========================================================

    await replacePostTags(
      client,
      id,
      input.tags ?? [],
    );

    // ========================================================
    // COMMIT
    // ========================================================

    await client.query(
      "COMMIT",
    );
  } catch (error) {
    await client.query(
      "ROLLBACK",
    );

    throw error;
  } finally {
    client.release();
  }
}

export async function deleteBlogPost(id: string) {
  const result = await getDb().query(
    'DELETE FROM blog_posts WHERE id = $1::uuid RETURNING id',
    [id],
  );
  return result.rowCount === 1;
}

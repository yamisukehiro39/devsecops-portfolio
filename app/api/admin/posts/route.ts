import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '../../../../lib/auth/session';
import {
  createBlogPost,
  getAllPostsForAdmin,
  type BlogPostInput,
} from '../../../../lib/blog-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function validateInput(value: unknown): BlogPostInput | null {
  if (!value || typeof value !== 'object') return null;
  const body = value as Record<string, unknown>;
  const status = body.status === 'published' ? 'published' : body.status === 'draft' ? 'draft' : null;
  if (typeof body.title !== 'string' || !body.title.trim() || typeof body.category !== 'string' || !body.category.trim() || !status) {
    return null;
  }

  return {
    title: body.title,
    slug: typeof body.slug === 'string' ? body.slug : undefined,
    category: body.category,
    excerpt: typeof body.excerpt === 'string' ? body.excerpt : '',
    tags: Array.isArray(body.tags) ? body.tags.filter((item): item is string => typeof item === 'string') : [],
    content: typeof body.content === 'string' ? body.content : '',
    image: typeof body.image === 'string' ? body.image : '',
    imageAlt: typeof body.imageAlt === 'string' ? body.imageAlt : '',
    seoTitle: typeof body.seoTitle === 'string' ? body.seoTitle : '',
    seoDescription: typeof body.seoDescription === 'string' ? body.seoDescription : '',
    canonicalUrl: typeof body.canonicalUrl === 'string' ? body.canonicalUrl : '',
    ogImageUrl: typeof body.ogImageUrl === 'string' ? body.ogImageUrl : '',
    noindex: Boolean(body.noindex),
    featured: Boolean(body.featured),
    status,
  };
}

function databaseError(error: unknown) {
  const code = typeof error === 'object' && error && 'code' in error ? String((error as { code?: unknown }).code ?? '') : '';
  if (code === '23505') {
    return NextResponse.json({ error: 'That publication slug is already in use.' }, { status: 409 });
  }
  if (code === 'CATEGORY_NOT_FOUND') {
    return NextResponse.json({ error: 'The selected category no longer exists.' }, { status: 400 });
  }
  console.error('Admin publication database error:', error);
  return NextResponse.json({ error: 'The publication could not be saved.' }, { status: 500 });
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    return NextResponse.json({ posts: await getAllPostsForAdmin() });
  } catch (error) {
    return databaseError(error);
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const input = validateInput(await request.json().catch(() => null));
  if (!input) return NextResponse.json({ error: 'Invalid publication data.' }, { status: 400 });
  if (input.status === 'published' && (!input.excerpt?.trim() || !input.content?.trim())) {
    return NextResponse.json({ error: 'Excerpt and article HTML are required before publishing.' }, { status: 400 });
  }

  try {
    const id = await createBlogPost(input, admin.id);
    const posts = await getAllPostsForAdmin();
    return NextResponse.json({ ok: true, id, posts }, { status: 201 });
  } catch (error) {
    return databaseError(error);
  }
}

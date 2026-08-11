import { NextResponse } from 'next/server';
import { recordVisit } from '../../../../lib/analytics-db';

export const runtime = 'nodejs';

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const candidate = (forwarded?.split(',')[0] ?? request.headers.get('x-real-ip') ?? request.headers.get('cf-connecting-ip') ?? '').trim();

  if (!candidate || candidate.length > 64 || !/^[0-9a-fA-F:.]+$/.test(candidate)) {
    return null;
  }

  return candidate.startsWith('::ffff:') ? candidate.slice(7) : candidate;
}

function isPublicPath(pathname: unknown): pathname is string {
  return typeof pathname === 'string'
    && pathname.startsWith('/')
    && pathname.length <= 255
    && !pathname.startsWith('/admin')
    && !pathname.startsWith('/login')
    && !pathname.startsWith('/api');
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null) as { path?: unknown; articleSlug?: unknown } | null;
    const ipAddress = getClientIp(request);

    if (!body || !isPublicPath(body.path) || !ipAddress) {
      return new NextResponse(null, { status: 204 });
    }

    const articleSlug = typeof body.articleSlug === 'string' && /^[a-z0-9-]{1,255}$/.test(body.articleSlug)
      ? body.articleSlug
      : undefined;

    await recordVisit({
      ipAddress,
      userAgent: request.headers.get('user-agent')?.slice(0, 512) ?? null,
      articleSlug,
    });
  } catch (error) {
    console.error('Analytics visit could not be recorded:', error);
  }

  return new NextResponse(null, { status: 204 });
}

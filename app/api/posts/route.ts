import { NextResponse } from 'next/server';
import { getPublishedPosts } from '../../../lib/blog-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ posts: await getPublishedPosts() });
  } catch (error) {
    console.error('Public blog query failed:', error);
    return NextResponse.json({ error: 'Blog publications are temporarily unavailable.' }, { status: 500 });
  }
}

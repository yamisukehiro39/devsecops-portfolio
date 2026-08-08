import { NextResponse } from 'next/server';
import { getPublishedPostBySlug } from '../../../../lib/blog-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  try {
    const post = await getPublishedPostBySlug(slug);
    if (!post) return NextResponse.json({ error: 'Publication not found.' }, { status: 404 });
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Public article query failed:', error);
    return NextResponse.json({ error: 'Publication is temporarily unavailable.' }, { status: 500 });
  }
}

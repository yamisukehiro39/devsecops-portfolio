import { NextResponse } from 'next/server';

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
  const publisherId = client.replace(/^ca-/, '');
  const body = publisherId.startsWith('pub-')
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : '# Configure NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX before enabling AdSense.\n';

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

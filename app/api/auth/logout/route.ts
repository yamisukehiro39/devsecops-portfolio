import { type NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { AUTH_COOKIE_NAME } from '../../../../lib/auth/config';
import { hashToken, verifyAdminJwt } from '../../../../lib/auth/jwt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (token) {
    try {
      const payload = await verifyAdminJwt(token);
      await getDb().query(
        `
          UPDATE admin_sessions
          SET revoked_at = NOW()
          WHERE id = $1::uuid
            AND token_hash = $2
            AND revoked_at IS NULL
        `,
        [payload.sessionId, hashToken(token)],
      );
    } catch {
      // An invalid/expired token is already effectively logged out.
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}

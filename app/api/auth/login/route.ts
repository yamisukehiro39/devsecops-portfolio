import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { AUTH_COOKIE_NAME } from '../../../../lib/auth/config';
import { createAdminJwt, hashToken } from '../../../../lib/auth/jwt';

type AdminRow = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown } | null;
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 },
      );
    }

    const result = await getDb().query<AdminRow>(
      `
        SELECT id, email, first_name, last_name
        FROM admins
        WHERE LOWER(email) = LOWER($1)
          AND is_active = TRUE
          AND password_hash = crypt($2, password_hash)
        LIMIT 1
      `,
      [email, password],
    );

    const admin = result.rows[0];

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 },
      );
    }

    const { token, sessionId, expiresAt, ttlSeconds } = await createAdminJwt({
      id: admin.id,
      email: admin.email,
    });

    const userAgent = request.headers.get('user-agent');
    const client = await getDb().connect();

    try {
      await client.query('BEGIN');

      await client.query(
        `
          INSERT INTO admin_sessions (
            id,
            admin_id,
            token_hash,
            user_agent,
            expires_at
          )
          VALUES ($1::uuid, $2::uuid, $3, $4, $5)
        `,
        [sessionId, admin.id, hashToken(token), userAgent, expiresAt],
      );

      await client.query(
        'UPDATE admins SET last_login_at = NOW() WHERE id = $1::uuid',
        [admin.id],
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

    const response = NextResponse.json({
      ok: true,
      admin: {
        id: admin.id,
        email: admin.email,
        firstName: admin.first_name,
        lastName: admin.last_name,
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: ttlSeconds,
    });

    return response;
  } catch (error) {
    console.error('Admin login failed:', error);
    return NextResponse.json(
      { error: 'Authentication service is unavailable.' },
      { status: 500 },
    );
  }
}

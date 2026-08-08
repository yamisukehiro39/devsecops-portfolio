import { cookies } from 'next/headers';
import { getDb } from '../db';
import { AUTH_COOKIE_NAME } from './config';
import { hashToken, verifyAdminJwt } from './jwt';

export type AuthenticatedAdmin = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
};

type SessionRow = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
};

export async function validateAdminToken(token: string): Promise<AuthenticatedAdmin | null> {
  try {
    const payload = await verifyAdminJwt(token);
    const tokenHash = hashToken(token);

    const result = await getDb().query<SessionRow>(
      `
        SELECT
          a.id,
          a.email,
          a.first_name,
          a.last_name
        FROM admin_sessions s
        JOIN admins a ON a.id = s.admin_id
        WHERE s.id = $1::uuid
          AND s.admin_id = $2::uuid
          AND s.token_hash = $3
          AND s.revoked_at IS NULL
          AND s.expires_at > NOW()
          AND a.is_active = TRUE
        LIMIT 1
      `,
      [payload.sessionId, payload.sub, tokenHash],
    );

    const admin = result.rows[0];
    if (!admin) return null;

    return {
      id: admin.id,
      email: admin.email,
      firstName: admin.first_name,
      lastName: admin.last_name,
    };
  } catch {
    return null;
  }
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) return null;
  return validateAdminToken(token);
}

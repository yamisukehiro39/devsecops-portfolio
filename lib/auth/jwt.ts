import { createHash, randomUUID } from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';
import { JWT_AUDIENCE, JWT_ISSUER, getJwtSecret, getJwtTtlSeconds } from './config';

export type AdminJwtPayload = {
  sub: string;
  email: string;
  sessionId: string;
};

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export async function createAdminJwt(admin: { id: string; email: string }) {
  const ttlSeconds = getJwtTtlSeconds();
  const sessionId = randomUUID();

  const token = await new SignJWT({
    email: admin.email,
    sessionId,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(admin.id)
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setJti(sessionId)
    .setIssuedAt()
    .setExpirationTime(`${ttlSeconds}s`)
    .sign(getJwtSecret());

  return {
    token,
    sessionId,
    expiresAt: new Date(Date.now() + ttlSeconds * 1000),
    ttlSeconds,
  };
}

export async function verifyAdminJwt(token: string): Promise<AdminJwtPayload> {
  const { payload } = await jwtVerify(token, getJwtSecret(), {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    algorithms: ['HS256'],
  });

  if (
    typeof payload.sub !== 'string' ||
    typeof payload.email !== 'string' ||
    typeof payload.sessionId !== 'string'
  ) {
    throw new Error('Invalid admin token payload.');
  }

  return {
    sub: payload.sub,
    email: payload.email,
    sessionId: payload.sessionId,
  };
}

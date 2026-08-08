export const AUTH_COOKIE_NAME = 'portfolio_admin_token';

export const JWT_ISSUER = process.env.JWT_ISSUER ?? '0thman.tech';
export const JWT_AUDIENCE = process.env.JWT_AUDIENCE ?? 'portfolio-admin';

export function getJwtTtlSeconds() {
  const value = Number(process.env.JWT_EXPIRES_IN_SECONDS ?? 86_400);

  if (!Number.isFinite(value) || value < 300) {
    throw new Error('JWT_EXPIRES_IN_SECONDS must be a number greater than or equal to 300.');
  }

  return Math.floor(value);
}

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured.');
  }

  if (secret.startsWith('replace-this-')) {
    throw new Error('JWT_SECRET is still using the example value. Generate a real secret first.');
  }

  if (Buffer.byteLength(secret, 'utf8') < 32) {
    throw new Error('JWT_SECRET must contain at least 32 bytes of random data.');
  }

  return new TextEncoder().encode(secret);
}

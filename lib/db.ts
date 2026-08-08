import { Pool, type PoolConfig } from "pg";

declare global {
  // Permet de réutiliser la connexion PostgreSQL en développement
  // avec le hot reload de Next.js.
  // eslint-disable-next-line no-var
  var __portfolioPgPool: Pool | undefined;
}

/**
 * Convertit une variable d'environnement en boolean.
 */
function envBoolean(
  value: string | undefined,
  fallback = false,
): boolean {
  if (value === undefined) {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(
    value.toLowerCase(),
  );
}

/**
 * Construit la configuration PostgreSQL.
 *
 * Supporte :
 *
 * DATABASE_URL
 *
 * ou
 *
 * PGHOST
 * PGPORT
 * PGDATABASE
 * PGUSER
 * PGPASSWORD
 */
function buildPoolConfig(): PoolConfig {
  const useSsl = envBoolean(
    process.env.DATABASE_SSL,
    process.env.NODE_ENV === "production",
  );

  const rejectUnauthorized = envBoolean(
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED,
    false,
  );

  const ssl: PoolConfig["ssl"] = useSsl
    ? {
        rejectUnauthorized,
      }
    : false;

  /*
   * =========================================================
   * DATABASE_URL
   * =========================================================
   *
   * C'est la méthode recommandée pour Heroku PostgreSQL.
   */
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,

      ssl,

      max: Number(
        process.env.DATABASE_POOL_MAX ?? 10,
      ),

      idleTimeoutMillis: 30_000,

      connectionTimeoutMillis: 10_000,
    };
  }

  /*
   * =========================================================
   * PG* VARIABLES
   * =========================================================
   *
   * Alternative à DATABASE_URL.
   */

  const requiredVariables = [
    "PGHOST",
    "PGDATABASE",
    "PGUSER",
    "PGPASSWORD",
  ] as const;

  const missingVariables =
    requiredVariables.filter(
      (key) => !process.env[key],
    );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing PostgreSQL configuration: ${missingVariables.join(
        ", ",
      )}. Set DATABASE_URL or the individual PG* variables.`,
    );
  }

  return {
    host: process.env.PGHOST,

    port: Number(
      process.env.PGPORT ?? 5432,
    ),

    database: process.env.PGDATABASE,

    user: process.env.PGUSER,

    password: process.env.PGPASSWORD,

    ssl,

    max: Number(
      process.env.DATABASE_POOL_MAX ?? 10,
    ),

    idleTimeoutMillis: 30_000,

    connectionTimeoutMillis: 10_000,
  };
}

/**
 * ============================================================
 * GET DATABASE
 * ============================================================
 *
 * Retourne le pool PostgreSQL utilisé dans tout le projet.
 *
 * Exemple :
 *
 * const result = await getDb().query(
 *   "SELECT * FROM blog_posts"
 * );
 */
export function getDb(): Pool {
  /*
   * En développement, Next.js recharge régulièrement
   * les modules.
   *
   * On réutilise donc le même Pool pour éviter
   * de créer beaucoup de connexions PostgreSQL.
   */

  if (globalThis.__portfolioPgPool) {
    return globalThis.__portfolioPgPool;
  }

  const pool = new Pool(
    buildPoolConfig(),
  );

  /*
   * Gestion des erreurs inattendues du pool.
   */
  pool.on(
    "error",
    (error) => {
      console.error(
        "Unexpected PostgreSQL pool error:",
        error,
      );
    },
  );

  /*
   * Pendant npm run dev,
   * garder le Pool globalement.
   */
  if (
    process.env.NODE_ENV !==
    "production"
  ) {
    globalThis.__portfolioPgPool =
      pool;
  }

  return pool;
}
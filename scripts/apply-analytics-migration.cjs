const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  const connectionString = process.env.PORTFOLIO_MIGRATION_DATABASE_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('Set PORTFOLIO_MIGRATION_DATABASE_URL or DATABASE_URL before running this migration.');
  }

  const sql = fs.readFileSync(path.join(__dirname, '..', 'database', 'analytics.sql'), 'utf8');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    await client.query(sql);
    const result = await client.query(
      `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'site_visitors'
          AND column_name IN ('country_name', 'city', 'isp', 'asn', 'timezone')
        ORDER BY column_name
      `,
    );
    console.log(`Analytics migration applied. Columns: ${result.rows.map((row) => row.column_name).join(', ')}`);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

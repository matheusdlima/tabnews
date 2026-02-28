import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function getPostgresVersion() {
  const result = await query("SHOW server_version;");
  return result.rows[0].server_version;
}

async function getMaxConnections() {
  const result = await query("SHOW max_connections");
  return result.rows[0].max_connections;
}

async function getOpenConnections(databaseName) {
  const result = await query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  return result.rows[0].count;
}

export default {
  query: query,
  getPostgresVersion: getPostgresVersion,
  getMaxConnections: getMaxConnections,
  getOpenConnections: getOpenConnections,
};

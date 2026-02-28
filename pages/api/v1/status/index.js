import database from "infra/database.js";

async function status(request, response) {
  const upadateAt = new Date().toISOString();
  const postgressVersion = await database.getPostgresVersion();
  const maxConnections = await database.getMaxConnections();
  const databaseName = process.env.POSTGRES_DB;
  const openConnections = await database.getOpenConnections(databaseName);

  response.status(200).json({
    updated_at: upadateAt,
    dependencies: {
      database: {
        version: postgressVersion,
        max_connections: parseInt(maxConnections),
        open_connections: openConnections,
      },
    },
  });
}

export default status;

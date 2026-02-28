test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const responseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(responseUpdatedAt);

  const postgresVersion = responseBody.dependencies.database.version;
  expect(postgresVersion).toEqual("16.0");
  expect(postgresVersion).toBeDefined();

  const maxConnections = responseBody.dependencies.database.max_connections;
  expect(maxConnections).toBeDefined();
  expect(typeof maxConnections).toBe("number");
  expect(maxConnections).toBe(100);

  const openConnections = responseBody.dependencies.database.open_connections;
  expect(openConnections).toBeDefined();
  expect(typeof openConnections).toBe("number");
  expect(openConnections).toBe(1);
});

export const config = {
  env: process.env.NODE_ENV ?? "dev",
  apiPort: process.env.API_PORT ?? 3000,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
};

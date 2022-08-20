const config = {
  env: process.env.NODE_ENV ?? 'dev',
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbPort: process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : undefined,
  dbHost: process.env.DB_HOST,
};

export default { ...config };

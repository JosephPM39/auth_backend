const config = {
  env: process.env.NODE_ENV ?? 'dev',
  apiPort: process.env.API_PORT ?? 3000,
  appVersion: process.env.npm_package_version ?? '0.0.1',
};

export default { ...config };

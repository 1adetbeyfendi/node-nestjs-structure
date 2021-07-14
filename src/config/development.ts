export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    // https://typeorm.io/#/connection-options/common-connection-options
    synchronize: false,
    logging: false,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dbname',
    extra: {
      connectionLimit: 10,
    },
  },
  foo: 'dev-bar',
  DB_LOCATION: 'F:/DEVELOPER/repos/GIT/cryptobot/server/strapi_crypto/.tmp/data.db',
  COMMAS_RELOAD_TIME: 3000,
  // PORT: 8810,
  // Redis
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
  REDIS_DB: 6,
  JWT_SECRET: '8940d87d-c82c-4ae0-be5d-cd770487074c',
  STRAPI_PATH: 'http://localhost:1337',
};

export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: false,
    logging: false,
    replication: {
      master: {
        host: process.env.DB_HOST || 'masterHost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || 'username',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'dbname',
      },
      slaves: [{ // fix if necessary
        host: 'slaveHost',
        port: 3306,
        username: 'username',
        password: 'password',
        database: 'dbname',
      }],
    },
    extra: {
      connectionLimit: 30,
    },
    entities: [`${__dirname}/../entity/**/*.{js,ts}`],
    subscribers: [`${__dirname}/../subscriber/**/*.{js,ts}`],
    migrations: [`${__dirname}/../migration/**/*.{js,ts}`],
  },
  graphql: {
    debug: false,
    playground: false,
    autoSchemaFile: true,
  },
  foo: 'pro-bar',

  // DB_LOCATION: '/var/www/vhosts/rambilisim.com/trade_backend/strapi_crypto/.tmp/data.db',
  DB_LOCATION: '../strapi_crypto/.tmp/data.db',

  COMMAS_RELOAD_TIME: 3000,
  PORT: 1338,
  // Redis
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
  REDIS_DB: 6,
  JWT_SECRET: '8940d87d-c82c-4ae0-be5d-cd770487074c',
  STRAPI_PATH:'http://localhost:1339'

};

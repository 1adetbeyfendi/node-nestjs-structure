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
        database: 'dbname',
      },
      slaves: [{
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
  },
  graphql: {
    debug: false,
    playground: false,
    autoSchemaFile: true,
  },
  foo: 'pro-bar',
};

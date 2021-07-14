module.exports = {
  apps: [{
    name: 'nest-backend',
    script: 'dist/app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    // instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      COMMAS_RELOAD_TIME: 1000,
      JWT_SECRET: '8940d87d-c82c-4ae0-be5d-cd770487074c',
      GRAPHQL_PLAYGROUND: false,
      // redis 
      REDIS_HOST: '127.0.0.1',
      REDIS_PORT: 6379,
      REDIS_DB: 6,
      PORT: 1338,
      DB_LOCATION: '/var/www/vhosts/rambilisim.com/trade_backend/strapi_crypto/.tmp/data.db'


    }
  }],

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};

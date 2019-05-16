const config = {
  dev: {
    port: 3999,
    mysql: {
      client: 'mysql',
      connection: {
          host: 'localhost',
          port: 3306,
          user: 'DB_USER',
          password: 'DB_PASSWORD',
          database: 'DB_NAME',
          charset: 'utf8mb4',
          connectTimeout: 15000,
          stringifyObjects: false,
          multipleStatements: true,
          supportBigNumbers: true,
          connectionLimit: 1
      },
      pool: { min: 1, max: 10 },
      debug: false
    }
  },
  prod: {
    port: 3999,
    mysql: {
      client: 'mysql',
      connection: {
          host: 'localhost',
          port: 3306,
          user: 'DB_USER',
          password: 'DB_PASSWORD',
          database: 'DB_NAME',
          charset: 'utf8mb4',
          connectTimeout: 15000,
          stringifyObjects: false,
          multipleStatements: true,
          supportBigNumbers: true,
          connectionLimit: 1
      },
      pool: { min: 1, max: 10 },
      debug: false
    },
  }
};

const env = process.env.NODE_ENV == 'production' ? 'prod' : 'dev';
export = config[env];
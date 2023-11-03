module.exports = {
    client: 'postgresql',
    connection: {
      host: process.env.GROCERY_STORE_DB_HOST,
      database: process.env.GROCERY_STORE_DB_NAME,
      user: process.env.GROCERY_STORE_DB_USER,
      password: process.env.GROCERY_STORE_DB_PASSWORD,
    },
    migrations: {
      tableName: 'migrations',
    },
    pool: {
      min: 1,
      max: 200,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 20000,
      idleTimeoutMillis: 20000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100
    },
    seeds: {
      directory: './build/seeds',
    }
  };
  
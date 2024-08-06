import type { Knex } from "knex";
import { env } from "./src/env";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg', // Specifies the PostgreSQL client
    connection: {
      host: env.DB_HOST, 
      port: Number(env.DB_PORT), //This is done due env variables are recognized as strings in t3-oss
      database: env.DB_DATABASE,
      user: env.DB_USER, 
      password: env.DB_PASSWORD, 
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/db/migrations`
    },
  },
  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }

};

module.exports = config;
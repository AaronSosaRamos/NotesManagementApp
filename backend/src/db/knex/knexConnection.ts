import knex from 'knex';
import { env } from '../../env';

export const knexConnection = knex({
    client: 'pg',
    connection: {
        host: env.DB_HOST,
        port: Number(env.DB_PORT),
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
    },
});
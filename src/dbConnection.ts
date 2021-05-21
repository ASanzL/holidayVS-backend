import { createConnection } from 'typeorm';
import { Holidays } from './models/holidays.model'
import * as dotenv from 'dotenv';

export function dbConnection() {    
    return createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        // port: Number(process.env.dbPort),
        // username: process.env.postgresUsername,
        // password: process.env.postgresPassword,
        // database: process.env.dbName,
        entities: [Holidays],
        extra: {
            ssl: { rejectUnauthorized: false }
        }
    });
}
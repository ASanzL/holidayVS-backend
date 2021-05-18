import { createConnection } from 'typeorm';
import { Holidays } from './models/holidays.model'
import * as dotenv from 'dotenv';

export function dbConnection() {
    console.log(`Start connection to: ${process.env.dbHost}: ${process.env.dbPort}`);
    
    return createConnection({
        type: "postgres",
        host: process.env.dbHost,
        port: Number(process.env.dbPort),
        username: process.env.postgresUsername,
        password: process.env.postgresPassword,
        database: process.env.dbName,
        entities: [Holidays],
        extra: {
            ssl: { rejectUnauthorized: false }
        }
    });
}
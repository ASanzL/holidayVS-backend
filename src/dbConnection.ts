import { createConnection } from 'typeorm';
import { Holidays } from './models/holidays.model'
import * as dotenv from 'dotenv';

export function dbConnection() {      
    return createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [Holidays],
        extra: process.env.PORT ? {
            ssl: { rejectUnauthorized: false }
        } : null
    });
}
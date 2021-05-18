"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var holidays_model_1 = require("./models/holidays.model");
function dbConnection() {
    console.log("Start connection to: " + process.env.dbHost + ": " + process.env.dbPort);
    return typeorm_1.createConnection({
        type: "postgres",
        host: process.env.dbHost,
        port: Number(process.env.dbPort),
        username: process.env.postgresUsername,
        password: process.env.postgresPassword,
        database: process.env.dbName,
        entities: [holidays_model_1.Holidays],
        extra: {
            ssl: { rejectUnauthorized: false }
        }
    });
}
exports.dbConnection = dbConnection;
//# sourceMappingURL=dbConnection.js.map
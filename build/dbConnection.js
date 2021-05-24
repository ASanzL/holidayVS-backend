"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var holidays_model_1 = require("./models/holidays.model");
function dbConnection() {
    return typeorm_1.createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [holidays_model_1.Holidays],
        extra: process.env.PORT ? {
            ssl: { rejectUnauthorized: false }
        } : null
    });
}
exports.dbConnection = dbConnection;
//# sourceMappingURL=dbConnection.js.map
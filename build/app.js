"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var holidays_controller_1 = require("./controllers/holidays.controller");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var holidayController = new holidays_controller_1.HolidayController();
app.get('/holidays', function (req, res) { return holidayController.getHolidays(req, res); });
app.post('/vote', function (req, res) { return holidayController.vote(req, res); });
app.get('/match', function (req, res) { return holidayController.getTwoRandomHolidays(req, res); });
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
//# sourceMappingURL=app.js.map
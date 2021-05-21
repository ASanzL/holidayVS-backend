require('dotenv').config();
import "reflect-metadata";
import express = require('express');
import bodyParser = require('body-parser');
const app = express();
import * as cors from 'cors';
import { HolidayController } from './controllers/holidays.controller';

app.use(cors({ origin: "https://asanzl.github.io", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const holidayController = new HolidayController();

app.get('/holidays', (req, res) => holidayController.getHolidays(req, res));

app.post('/vote', (req, res) => holidayController.vote(req, res));

app.get('/match', (req, res) => holidayController.getTwoRandomHolidays(req, res));

app.listen(process.env.PORT || 3000, function () {
    console.log(`App is listening on port ${process.env.PORT}!`);
});
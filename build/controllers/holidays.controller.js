"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbConnection_1 = require("../dbConnection");
var holidays_model_1 = require("../models/holidays.model");
var HolidayController = /** @class */ (function () {
    function HolidayController() {
        this.kValue = 32;
    }
    HolidayController.prototype.getHolidays = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    dbConnection_1.dbConnection().then(function (c) { return __awaiter(_this, void 0, void 0, function () {
                        var holidays;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, c.getRepository(holidays_model_1.Holidays).createQueryBuilder('Holidays').orderBy({ score: 'DESC' }).getMany()];
                                case 1:
                                    holidays = _a.sent();
                                    return [4 /*yield*/, c.close()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, res.send(holidays)];
                            }
                        });
                    }); });
                }
                catch (e) {
                    console.log(e);
                }
                return [2 /*return*/];
            });
        });
    };
    HolidayController.prototype.vote = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    dbConnection_1.dbConnection().then(function (c) { return __awaiter(_this, void 0, void 0, function () {
                        var holidayRepo, holiday1, holiday2, probablityHoliday1Win, probablityHoliday2Win;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, c.getRepository(holidays_model_1.Holidays)];
                                case 1:
                                    holidayRepo = _a.sent();
                                    return [4 /*yield*/, holidayRepo.findOne({ where: { name: req.body.holiday1 } })];
                                case 2:
                                    holiday1 = _a.sent();
                                    return [4 /*yield*/, holidayRepo.findOne({ where: { name: req.body.holiday2 } })];
                                case 3:
                                    holiday2 = _a.sent();
                                    probablityHoliday1Win = 1 / (1 + Math.pow(10, (holiday2.score - holiday1.score) / 400));
                                    probablityHoliday2Win = 1 / (1 + Math.pow(10, (holiday1.score - holiday2.score) / 400));
                                    holiday1.score += this.kValue * (1 - probablityHoliday1Win);
                                    holiday2.score += this.kValue * (0 - probablityHoliday2Win);
                                    return [4 /*yield*/, holidayRepo.save(holiday1)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, holidayRepo.save(holiday2)];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, c.close()];
                                case 6:
                                    _a.sent();
                                    return [2 /*return*/, res.send({ probablity1: probablityHoliday1Win, probablity2: probablityHoliday2Win, score1: holiday1.score, score2: holiday2.score })];
                            }
                        });
                    }); });
                }
                catch (e) {
                    console.log(e);
                }
                return [2 /*return*/];
            });
        });
    };
    HolidayController.prototype.getTwoRandomHolidays = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    dbConnection_1.dbConnection().then(function (c) { return __awaiter(_this, void 0, void 0, function () {
                        var holidayRepo, holiday1id, holiday2id, holiday1, holiday2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, c.getRepository(holidays_model_1.Holidays)];
                                case 1:
                                    holidayRepo = _a.sent();
                                    holiday1id = Math.floor(Math.random() * 16) + 1;
                                    holiday2id = Math.floor(Math.random() * 16) + 1;
                                    while (holiday1id === holiday2id) {
                                        holiday2id = Math.floor(Math.random() * 16) + 1;
                                    }
                                    return [4 /*yield*/, holidayRepo.findOne({ id: holiday1id })];
                                case 2:
                                    holiday1 = _a.sent();
                                    return [4 /*yield*/, holidayRepo.findOne({ id: holiday2id })];
                                case 3:
                                    holiday2 = _a.sent();
                                    return [4 /*yield*/, c.close()];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/, res.send({ holiday1: holiday1, holiday2: holiday2 })];
                            }
                        });
                    }); });
                }
                catch (e) {
                    console.log(e);
                }
                return [2 /*return*/];
            });
        });
    };
    return HolidayController;
}());
exports.HolidayController = HolidayController;
//# sourceMappingURL=holidays.controller.js.map
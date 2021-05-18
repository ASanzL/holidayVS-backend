import { dbConnection } from '../dbConnection';
import { Holidays } from '../models/holidays.model';

export class HolidayController {
    // Maximum score for one win
    private kValue = 32;
    // The biggest gap in score that gives a full score
    private scoreInterval = 400;

    /**
    Returns all holidays in alphabetical order
     */
    public async getHolidays (req, res) {
        try {
            dbConnection().then(async c => {        
                const holidays = await c.getRepository(Holidays).createQueryBuilder('Holidays').orderBy({ score: 'DESC' }).getMany();
                await c.close();
                return res.send(holidays);
            });
        } catch (e) {
            console.log(e);
        }
    }

    /**
    Votes on holiday1 and updates score for both holidays
    */
    public async vote (req, res) {
        try {
        dbConnection().then(async c => {
            const holidayRepo = await c.getRepository(Holidays);
            const holiday1 = await holidayRepo.findOne({ where: { name: req.body.holiday1 }});
            const holiday2 = await holidayRepo.findOne({ where: { name: req.body.holiday2 }});

            const probablityHoliday1Win = 1 / (1 + Math.pow(10, (holiday2.score-holiday1.score) / this.scoreInterval));
            const probablityHoliday2Win = 1 / (1 + Math.pow(10, (holiday1.score-holiday2.score) / this.scoreInterval));

            holiday1.score += this.kValue * (1 - probablityHoliday1Win);
            holiday2.score += this.kValue * (0 - probablityHoliday2Win);

            await holidayRepo.save(holiday1);
            await holidayRepo.save(holiday2);
            
            await c.close();
            return res.send({ probablity1: probablityHoliday1Win, probablity2: probablityHoliday2Win, score1: holiday1.score, score2: holiday2.score });
        });
        } catch (e) {
            console.log(e);
        }
    }

    /**
    Returns two random holidays - no duplicates
    */
    public async getTwoRandomHolidays(req, res) {
        try {
        dbConnection().then(async c => {
            const holidayRepo = await c.getRepository(Holidays);
            let holiday1id = Math.floor(Math.random() * 16) + 1;
            let holiday2id = Math.floor(Math.random() * 16) + 1;

            while (holiday1id === holiday2id) {
                holiday2id = Math.floor(Math.random() * 16) + 1;
            }
            
            const holiday1 = await holidayRepo.findOne({ id: holiday1id });
            const holiday2 = await holidayRepo.findOne({ id: holiday2id });
            
            await c.close();
            return res.send({ holiday1: holiday1, holiday2: holiday2 });
        });
        } catch (e) {
            console.log(e);
        }
    }
}

import express from 'express';
import {  addDataPoint, getDatapointsByMetric, getDataPointsByMonth, getStatisticsByMonth } from '../services/dataService';
import { getTokenFrom } from '../utils/authentication';
import { toDataPoint, parseString, parseNumber } from '../utils/typeParsers';

const router = express.Router();

router.post('/', (req,res) => {
    void (async ()=> {
        try {
            const {date, temperature, rainfall, pH} = toDataPoint(req.body);
            if (!date) {
                res.status(400).end();
                return;
            }
            const auth = req.get('Authorization');
            const token = getTokenFrom(auth);
            if (!token || typeof token === 'string' || !("id" in token)) {
                res.status(401).end();
                return;
            } else {
                const id = parseString(token.id);
                const dataPoint = await addDataPoint(id,date, temperature, pH , rainfall);
                if (!dataPoint) {
                    res.status(400).end();
                    return;
                }
                res
                    .status(200)
                    .send(dataPoint.toJSON());
            } 
        } catch (e) {
            console.log(e);
            res.status(400).end();
        }
    })();
});

router.get('/byMonth', (req, res) => {
    void (async () => {
        try {
            const month = parseNumber(Number(req.query.month));
            const year = parseNumber(Number(req.query.year));

            const auth = req.get('Authorization');
            const token = getTokenFrom(auth);
            if (!token || typeof token === 'string' || !("id" in token)) {
                res.status(401).end();
                return;
            } else {
                const id = parseString(token.id);
                const dataPoints = await getDataPointsByMonth(id, year, month);
                if (!dataPoints) {
                    res.status(400).end();
                    return;
                }
                res
                    .status(200)
                    .send(dataPoints);
            }
        } catch (e) {
            console.log(e);
            res.status(400).end();
        }
    })();
});

router.get('/monthStatistics', (req,res) => {
    void (async () => {
        try {
            const month = parseNumber(Number(req.query.month));
            const year = parseNumber(Number(req.query.year));

            const auth = req.get('Authorization');
            const token = getTokenFrom(auth);
            if (!token || typeof token === 'string' || !("id" in token)) {
                res.status(401).end();
                return;
            } else {
                const id = parseString(token.id);
                const dataPoints = await getStatisticsByMonth(id, year, month);
                if (!dataPoints) {
                    res.status(400).end();
                    return;
                }
                res
                    .status(200)
                    .send(dataPoints);
            }
        } catch (e) {
            console.log(e);
            res.status(400).end();
        }
    })();
});


router.get('/byMetric', (req, res) => {
    void (async () => {
        try {
            const temperature = req.query.temperature ? parseNumber(Number(req.query.temperature)): 0;
            const pH = req.query.pH ? parseNumber(Number(req.query.pH)): 0;
            const rainfall = req.query.rainfall ? parseNumber(Number(req.query.rainfall)) : 0;

            const auth = req.get('Authorization');
            const token = getTokenFrom(auth);
            if (!token || typeof token === 'string' || !("id" in token)) {
                res.status(401).end();
                return;
            } else {
                const id = parseString(token.id);
                const dataPoints = await getDatapointsByMetric(id, temperature, pH, rainfall);
                if (!dataPoints) {
                    res.status(400).end();
                    return;
                }
                res
                    .status(200)
                    .send(dataPoints);
            }
        } catch (e) {
            console.log(e);
            res.status(400).end();
        }
    }) ();
});

//
//router.get('/year', (req, res) => {
//    void (async => {
//        const {year} = req.query;
//    })();
//});

export default router;
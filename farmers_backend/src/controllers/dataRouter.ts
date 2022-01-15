//File contains the apis for data management. Uses url ./api/data
import express from 'express';
import { addDataPoint, getDatapointsByMetric, getDataPointsByMonth, getStatisticsByMonth } from '../services/dataService';
import { getTokenFrom } from '../utils/authentication';
import { toDataPoint, parseString, parseNumber } from '../utils/typeParsers';

const router = express.Router();

//Api to add new datapoints. Requires the request body to have a valid datapoint and date to be in format yyyy-mm-dd or yyyy-m-d
router.post('/', (req,res) => {
    void (async () => {
        try {
            const { date, temperature, rainfall, pH } = toDataPoint(req.body);
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
                const dataPoint = await addDataPoint(id, date, temperature, pH , rainfall);
                if (!dataPoint) {
                    res.status(400).end();
                    return;
                }
                res.json(dataPoint.toJSON());
            } 
        } catch (e) {
            res.status(400).end();
        }
    })();
});

//Api to fetch datapoints by given month and year. Month and year are given as query parameters.
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
            res.status(400).end();
        }
    })();
});

//Api to fetch statistics by given month and year. Month and year are given as query parameters.
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
            res.status(400).end();
        }
    })();
});

//Api to fetch datapoints by given metric. Metric is given as query parameter.
router.get('/byMetric', (req, res) => {
    void (async () => {
        try {
            const metric = parseString(req.query.metric);
            const auth = req.get('Authorization');
            const token = getTokenFrom(auth);
            if (!token || typeof token === 'string' || !("id" in token)) {
                res.status(401).end();
                return;
            } else {
                const id = parseString(token.id);
                const dataPoints = await getDatapointsByMetric(id, metric);
                
                if (!dataPoints) {
                    res.status(400).end();
                    return;
                }
                res
                    .status(200)
                    .send(dataPoints);
            }
        } catch (e) {
            res.status(400).end();
        }
    }) ();
});

export default router;
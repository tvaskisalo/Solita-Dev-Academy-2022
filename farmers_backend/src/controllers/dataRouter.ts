
import express from 'express';
import {  addDataPoint } from '../services/dataService';
import { getTokenFrom } from '../utils/authentication';

const router = express.Router();

router.post('/', (req,res) => {
    void (async ()=> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {date, temperature, rainfall, pH} = req.body;
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
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const dataPoint = await addDataPoint(token.id,date as string, temperature as number, pH as number, rainfall as number);
                if (!dataPoint) {
                    res.status(400).end();
                    return;
                }
                res
                    .status(200)
                    .send(dataPoint?.toJSON());
            } catch (e) {
                console.log(e);
                res.status(400).end();
            }
        }
    })();
});

export default router;
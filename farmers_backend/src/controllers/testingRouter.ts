import express  from 'express';
import DataPointModel from '../models/dataPoint';
import UserModel from '../models/user';
import { addUser } from '../services/userService';

const router = express.Router();

router.post('/reset', (_req,res) => {
    void (async () => {
        await UserModel.deleteMany({});
        await DataPointModel.deleteMany({});
        await addUser('test', 'test');
        res.status(204).end();
    })();
});

export default router;
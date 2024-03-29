import loginRouter from './controllers/loginRouter';
import userRouter from './controllers/userRouter';
import dataRouter from './controllers/dataRouter';
import testingRouter from './controllers/testingRouter';

import express from "express";
import cors from 'cors';

import mongoose from 'mongoose';
import { MONGODB } from './utils/config';

mongoose.connect(MONGODB)
    .then( () => {
        console.log('Connected succesfully');
    })
    .catch(() => {
        console.log('error connecting');
    });
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('build'));

if (process.env.NODE_ENV === 'test') {
    app.use('/api/test', testingRouter);
}

app.use('/api/login', loginRouter);

app.use('/api/user', userRouter);

app.use('/api/data', dataRouter);

export default app;
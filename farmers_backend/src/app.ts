import loginRouter from './controllers/loginRouter';
import userRouter from './controllers/userRouter';
import dataRouter from './controllers/dataRouter';


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

app.use('/api/login', loginRouter);

app.use('/api/user', userRouter);

app.use('/api/data', dataRouter);

export default app;
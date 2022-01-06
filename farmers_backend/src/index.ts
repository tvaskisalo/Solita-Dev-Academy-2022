// This is the main file.

import express from "express";
import cors = require('cors');

import { PORT, MONGODB } from "./utils/config";

import loginRouter from './controllers/loginRouter';
import userRouter from './controllers/userRouter';
import dataRouter from './controllers/dataRouter';

import mongoose = require('mongoose');


mongoose.connect(MONGODB)
    .then( () => {
        console.log('Connected succesfully');
    })
    .catch((error: Error) => {
        console.log('error connecting', error.message);
    });
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/login', loginRouter);

app.use('/api/user', userRouter);

app.use('/api/data', dataRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


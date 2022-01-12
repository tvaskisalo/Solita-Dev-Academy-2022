// This has been confirmed to work on linux, but should work on windows too.

import csvParser from "./utils/csvparser";
import path from "path";
import fs from 'fs';

import mongoose from 'mongoose';
import { MONGODB } from './utils/config';
import UserModel from "./models/user";
import { addUser } from "./services/userService";

import { parseString } from "./utils/typeParsers";

const noora = path.resolve(__dirname, '..', 'src', '..', 'data', 'Nooras_farm.csv');



mongoose.connect(MONGODB)
    .then( () => {
        console.log('Connected succesfully');
    })
    .catch(() => {
        console.log('error connecting');
    });

if (fs.existsSync(noora)) {
    void(async () => {
        const user = await UserModel.find({username: 'Noora'});
        if (user.length === 0) {
            const noorasUser = await addUser('Noora', 'NooraFarm');
            await csvParser(noora, parseString(noorasUser?.id));
        }
    })();
} else {
    console.log('There is no Noora_farm.csv in directory ./src/data/');
}
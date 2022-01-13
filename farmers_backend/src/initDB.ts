// This has been confirmed to work on linux, but should work on windows too.

import csvParser from "./utils/csvparser";
import path from "path";
import fs from 'fs';

import mongoose from 'mongoose';
import { MONGODB } from './utils/config';
import UserModel from "./models/user";
import { addUser } from "./services/userService";

import { parseString } from "./utils/typeParsers";
console.log(__dirname);


const noora = path.resolve(__dirname, '.', 'data', 'Nooras_farm.csv');
const friman_metsola = path.resolve(__dirname, '.', 'data', 'friman_metsola.csv');
const ossi = path.resolve(__dirname, '.', 'data', 'ossi_farm.csv');
const partialTech = path.resolve(__dirname, '.', 'data', 'PartialTech.csv');



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

if (fs.existsSync(friman_metsola)) {
    void(async () => {
        const user = await UserModel.find({username: 'FrimanMetsola'});
        if (user.length === 0) {
            const frimanMetsolaUser = await addUser('FrimanMetsola', 'FrimanMetsolaFarm');
            await csvParser(friman_metsola, parseString(frimanMetsolaUser?.id));
        }
    })();
} else {
    console.log('There is no friman_metsola.csv in directory ./src/data/');
}

if (fs.existsSync(ossi)) {
    void(async () => {
        const user = await UserModel.find({username: 'Ossi'});
        if (user.length === 0) {
            const ossisUser = await addUser('Ossi', 'OssiFarm');
            await csvParser(ossi, parseString(ossisUser?.id));
        }
    })();
} else {
    console.log('There is no ossi_farm.csv in directory ./src/data/');
}

if (fs.existsSync(partialTech)) {
    void(async () => {
        const user = await UserModel.find({username: 'PartialTech'});
        if (user.length === 0) {
            const partialTechsUser = await addUser('PartialTech', 'PartialTechFarm');
            await csvParser(partialTech, parseString(partialTechsUser?.id));
        }
    })();
} else {
    console.log('There is no PartialTech_farm.csv in directory ./src/data/');
}

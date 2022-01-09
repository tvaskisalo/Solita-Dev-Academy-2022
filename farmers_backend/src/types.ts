//This file contains all of the types for TypeScript

import {Document} from 'mongoose';

export interface UserDocument extends Document {
    username: string,
    passwordHash: string,
    data?: DataPointDocument[]
}

export interface User {
    username: string,
    passwordHash: string,
}

export interface UserInfo {
    username: string, 
    password: string
}

export type Date = {
    year: number,
    month: number,
    day: number
};

export interface DataPointDocument extends Document {
    user: UserDocument,
    date: Date,
    temperature?: number,
    pH?: number,
    rainfall?: number
}

export interface DataPoint {
    date: Date,
    temperature?: number,
    pH?: number,
    rainfall?: number
}
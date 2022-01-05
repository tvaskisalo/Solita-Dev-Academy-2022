//This file contains all of the types for TypeScript

import {Document} from 'mongoose';

export interface User extends Document {
    username: string,
    passwordHash: string,
    data?: DataPoint[]
}

export interface DataPoint extends Document {
    user: User,
    date: string,
    temperature?: number,
    pH?: number,
    rainfall?: number
}
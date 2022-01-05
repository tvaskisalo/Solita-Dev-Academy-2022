//This is a model of MongoDB object dataPoint, which are the datapoints provided by the users.

import { model, Model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { DataPoint } from "../types";

const dataPointSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        require: true
    },
    temperature: {
        type: Number,
        required: false,
        min: -50,
        max: 100
    },
    pH: {
        type: Number,
        required: false,
        min: 0,
        max: 14
    },
    rainfall: {
        type: Number,
        required: false,
        min: 0,
        max: 500
    }
    
});

dataPointSchema.plugin(mongooseUniqueValidator);

dataPointSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id as string;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const UserModel: Model<DataPoint> = model('DataPoint', dataPointSchema);

module.exports = UserModel;
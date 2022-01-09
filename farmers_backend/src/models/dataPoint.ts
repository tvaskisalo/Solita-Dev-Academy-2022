//This is a model of MongoDB object dataPoint, which are the datapoints provided by the users.

import { model, Model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { DataPointDocument } from "../types";

const dataPointSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        year: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },
        day: {
            type: Number,
            required: true,
            min: 1,
            max: 31
        }
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

const DataPointModel: Model<DataPointDocument> = model('DataPoint', dataPointSchema);

export default DataPointModel;
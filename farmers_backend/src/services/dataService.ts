import DataPointModel from '../models/dataPoint';
import UserModel from '../models/user';
import { DataPointDocument, Date } from '../types';

export const getDataPointsByMonth =async ( id: string, yearNo: number, monthNo: number) => {
    const dataPoints = await DataPointModel.find({
        "date.day": {$exists: true},
        "date.month": Number(monthNo),
        "date.year": Number(yearNo),
        user: {_id: id}
    },{temperature: 1, pH:1, rainfall: 1, date: 1});
    return dataPoints;
};

//As a note, the sum of pH is exculded on purpose. Since pH uses a logarithmic scale, the sum of all pH values in a month does not tell anything useful. 
export const getStatisticsByMonth = async (id: string, yearNo: number, monthNo: number) => {
    const user = await UserModel.findById(id);
    const dataPoints = await DataPointModel.aggregate( [
        {$match: {
            // The function assumes that correct id is always given, so the following unsafe assignment is okay, since user will always be found and have a field _id.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            "user": user?._id,
            "date.day": {$exists: true},
            "date.month": {$eq: Number(monthNo)},
            "date.year": {$eq: Number(yearNo)},
        }},
        {$group: {
            _id: `${id} ${yearNo} ${monthNo}`,
            "pHAvg": {$avg: "$pH"},
            "pHMin": {$min: "$pH"},
            "pHMax": {$max: "$pH"},

            "rainAvg": {$avg: "$rainfall"},
            "rainSum": {$sum: "$rainfall"},
            "rainMin": {$min: "$rainfall"},
            "rainMax": {$max: "$rainfall"},    

            "tempAvg": {$avg: "$temperature"},
            "tempSum": {$sum: "$temperature"},
            "tempMin": {$min: "$temperature"},
            "tempMax": {$max: "$temperature"}
        }}
    ]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return dataPoints;
};

export const getDatapointsByMetric = async (id: string, temperature: number, pH:number, rainfall: number) => {
    const dataPoints = await DataPointModel.find({ 
        $and: [
            {
                $or: [
                    {"temperature": {$exists: temperature === 1 ? true: false}},
                    {"pH": {$exists: pH === 1 ? true: false}},
                    {"rainfall": {$exists: rainfall === 1 ? true: false}},
                ]   
            },
            {user: {_id: id}}
            ]
        },{
        user:0
    });
    return dataPoints;
};

export const addDataPoint = async (userId: string, date: Date, temperature: number | undefined, pH: number | undefined, rainfall: number | undefined): Promise<DataPointDocument | undefined> => {
    const user = await UserModel.findById(userId);
    if (!user) {
        return undefined;
    }
    const dPoint: DataPointDocument =  new DataPointModel({
        user: user,
        date: date,
        temperature: temperature,
        pH: pH,
        rainfall: rainfall
    });
    return await dPoint.save();
};
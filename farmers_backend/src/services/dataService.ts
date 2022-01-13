import DataPointModel from '../models/dataPoint';
import UserModel from '../models/user';
import { DataPointDocument, Date } from '../types';

export const getDataPointsByMonth = async ( id: string, yearNo: number, monthNo: number) => {
    const dataPoints = await DataPointModel.find({
        "date.day": { $exists: true },
        "date.month": Number(monthNo),
        "date.year": Number(yearNo),
        user: { _id: id }
    },{ temperature: 1, pH:1, rainfall: 1, date: 1 });
    return dataPoints;
};

//As a note, the sum of pH is exculded on purpose. Since pH uses a logarithmic scale, the sum of all pH values in a month does not tell anything useful. 
export const getStatisticsByMonth = async (id: string, yearNo: number, monthNo: number) => {
    const user = await UserModel.findById(id);
    const dataPoints = await DataPointModel.aggregate([
        { $match: {
            // The function assumes that correct id is always given, so the following unsafe assignment is okay, since user will always be found and have a field _id.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            "user": user?._id,
            "date.day": { $exists: true },
            "date.month": { $eq: Number(monthNo) },
            "date.year": { $eq: Number(yearNo) },
        }},
        { $group: {
            _id: `${id} ${yearNo} ${monthNo}`,
            "pHAvg": { $avg: "$pH" },
            "pHMin": { $min: "$pH" },
            "pHMax": { $max: "$pH" },

            "rainAvg": { $avg: "$rainfall" },
            "rainSum": { $sum: "$rainfall" },
            "rainMin": { $min: "$rainfall" },
            "rainMax": { $max: "$rainfall" },    

            "tempAvg": { $avg: "$temperature" },
            "tempSum": { $sum: "$temperature" },
            "tempMin": { $min: "$temperature" },
            "tempMax": { $max: "$temperature" }
        }}
    ]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return dataPoints;
};

export const getDatapointsByMetric = async (id: string, metric: string) => {
    let dataPoints;
    switch (metric) {
    case 'temperature':
        dataPoints = await DataPointModel.find({ 
            $and: [
                { "temperature": { $exists: true } },
                { user: { _id: id } }
            ]},{
            user:0,
            pH:0,
            rainFall:0
        });
        return dataPoints;

    case 'pH':
        dataPoints = await DataPointModel.find({ 
            $and: [
                { "pH": { $exists: true } },
                { user: { _id: id } }
            ]},{
            user:0,
            temperature: 0,
            rainfall: 0
        });
        return dataPoints;
    case 'rainfall':
        dataPoints = await DataPointModel.find({ 
            $and: [
                { "rainfall": { $exists: true } },
                { user: { _id: id } }
            ]},{
            user:0,
            temperature:0,
            pH:0,
        });
        return dataPoints;
    default:
        return undefined;
    }
    
};

export const addDataPoint = async (userId: string, date: Date, temperature: number | undefined, pH: number | undefined, rainfall: number | undefined) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        return undefined;
    }
    const existingDate = await DataPointModel.find({
        date: date,
        user: { _id: userId }
    });
    if (existingDate.length !== 0) {
        
        return await DataPointModel.findOneAndUpdate({
            date: date,
            user: { _id: userId }
        },{
            temperature: !temperature ? existingDate[0].temperature : temperature,
            pH: !pH ? existingDate[0].pH : pH,
            rainfall: !rainfall ? existingDate[0].rainfall : rainfall
        });
    } else {
        const dPoint: DataPointDocument =  new DataPointModel({
            user: user,
            date: date,
            temperature: temperature,
            pH: pH,
            rainfall: rainfall
        });
        return await dPoint.save();
    }
};
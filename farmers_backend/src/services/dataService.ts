import DataPointModel from '../models/dataPoint';
import UserModel from '../models/user';
import { DataPointDocument, Date } from '../types';

export const getMonthDataPoints =async ( id: string, yearNo: number, monthNo: number) => {
    try {
        const dataPoints = await DataPointModel.find({
            "date.day": {$exists: true},
            "date.month": Number(monthNo),
            "date.year": Number(yearNo),
            user: {_id: id}
        });
        console.log(dataPoints);
        
        return dataPoints;
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

export const addDataPoint = async (userId: string, date: Date, temperature: number | undefined, pH: number | undefined, rainfall: number | undefined): Promise<DataPointDocument | undefined> => {
    try {
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
    } catch (e) {
        console.log(111);
        console.log(e);
        return undefined;
    }
};
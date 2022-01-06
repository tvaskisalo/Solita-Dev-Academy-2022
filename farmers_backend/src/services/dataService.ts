import DataPointModel from '../models/dataPoint';
import UserModel from '../models/user';
import { DataPoint } from '../types';

export const getDataPoints =async ( id: string, _date: string) => {
    try {
        const dataPoints = await DataPointModel.find({user: {_id: id}, date:_date });
        return dataPoints;
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

export const addDataPoint = async (userId: string, date: string, _temperature: number, _pH: number, _rainfall: number): Promise<DataPoint | undefined> => {
    try {
        console.log(_pH);
        const user = await UserModel.findById(userId);
        if (!user) {
            return undefined;
        }
        const dPoint: DataPoint =  new DataPointModel({
            user: user,
            date: date,
            temperature: _temperature,
            pH: _pH,
            rainfall: _rainfall
        });
        return await dPoint.save();
    } catch (e) {
        console.log(e);
        return undefined;
    }
};
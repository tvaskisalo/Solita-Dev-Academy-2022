import { Date, DataPoint, UserInfo } from "../types";


// Explicit any is allowed for body, since it will be checked in the function. 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toDataPoint = (body: any): DataPoint => {
    // Unsafe assignment is allowed, since the types will be checked
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {date, temperature, pH, rainfall} = body;
    const newDataPoint: DataPoint = {
        date: parseDate(date),
        rainfall: rainfall ? parseNumber(Number(rainfall)) : undefined,
        temperature: temperature ? parseNumber(Number(temperature)) : undefined,
        pH: pH ? parseNumber(Number(pH)) : undefined,
    };
    return newDataPoint;
};

// Explicit any is allowed for body, since it will be checked in the function. 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toUserInfo = (body: any): UserInfo => {
    // Unsafe assignment is allowed, since the types will be checked
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {username, password} = body;
    const newUser: UserInfo = {
        username: parseString(username),
        password: parseString(password)
    };
    return newUser;
};

export const parseString = (str: unknown): string => {
    if(!str || !isString(str)) {
        throw new Error('Incorrect or missing string object');
    } 
    return str;
};

export const parseNumber = (num: unknown): number => {
    if((!num && num !== 0) || !isNumber(num)) {
        throw new Error('Incorrect or missing number object');
    }
    return num;
};

const isString = (str: unknown): str is string => {
    return typeof str === 'string';
};

export const parseDate = (date: unknown): Date => {
    const dateArray: string[] = parseString(date).split('-');
    if (dateArray.length !== 3) {
        throw new Error('Incorrect date string');
    }
    const [year, month, day] = dateArray;
    try {
        const yearNo = parseNumber(Number(year));
        const monthNo = parseNumber(Number(month));
        const dayNo = parseNumber(Number(day));
        const newDate: Date = {
            year: yearNo,
            month: monthNo,
            day: dayNo
        };
        return newDate;
    } catch(e) {
        throw new Error('Incorrect date string');
    }
};

const isNumber = (num: unknown): num is number => {
    return typeof num === 'number';
};
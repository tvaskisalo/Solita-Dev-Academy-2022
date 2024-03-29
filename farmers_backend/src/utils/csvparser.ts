/* eslint-disable @typescript-eslint/no-unsafe-call */
// This will parse the given .csv file into datapoints and add it for the user with the given id.
import fs from 'fs';
import { parseDate, parseString } from './typeParsers';
import { addDataPoint } from '../services/dataService';


const csvParser = async(filename:string, id:string) => {
    const dataPoints = fs.readFileSync(filename, {encoding:'utf-8'}).split('\n');
    let i = 0;
    for await(const line of dataPoints) {
        const dp = line.split(',');
        if (dp[0] !== 'location') {
            const date = parseDate(dp[1].split('T')[0]);

            const type = parseString(dp[2]);

            let temperature = undefined;
            let pH = undefined;
            let rainfall = undefined;
            try {
                if (type === 'rainFall') {
                    rainfall = Number(dp[3]);
                } else if (type === 'pH') {
                    pH = Number(dp[3]);
                } else if (type === 'temperature') {
                    temperature = Number(dp[3]);
                }
                await addDataPoint(id, date, temperature, pH, rainfall);
              
            } catch (e) {
                console.log(e);
            }
        }
        console.log(`${filename} ${i}`);
        i = i +1;
      
    }
};

export default csvParser;
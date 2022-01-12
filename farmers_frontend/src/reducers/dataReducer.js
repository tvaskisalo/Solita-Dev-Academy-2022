import dataService from "../services/dataService";

import { setNotification } from "./notificationReducer";

const dataReducer = (state = [], action) => {
    switch (action.type) {
        case 'addMonthDatapoints':
            const id = action.monthDataPoints.id;
            if (state.find((dp) => dp.id === id)) {
                console.log('found');
                return state.map(mdp => {
                    if (mdp.id === id) {
                        return action.monthDataPoints;
                    } else {
                        return mdp;
                    }   
                }) 
            } else {
                return state.concat(action.monthDataPoints);
            }
        default:
            return state;
    }
}

export const addDataPoint = (datapoint, token) => {
    return async dispatch => {
        try {
            const dataPoint = await dataService.addDataPoint(datapoint, token)
            console.log(dataPoint);
            if (dataPoint) {
                dispatch(setNotification('data','success', 5))
            }
        } catch (e) {
            dispatch(setNotification('data', 'failure', 5))
            console.log(e.message);
        }
    }
}

export const fetchMonthInfo = (date, token) => {
    return async dispatch => {
        try {
            const dataPoints = await dataService.getMonthData(date, token);
            dispatch({
                type: 'addMonthDatapoints',
                monthDataPoints: {
                    id: `y${date.year}m${date.month}`,
                    dataPoints
                }
            })
        } catch (e) {
            console.log(e.message);
        }
    };
}

export default dataReducer
import dataService from '../services/dataService'

import { setNotification } from './notificationReducer'

const dataReducer = (state = [], action) => {
    let id
    if (action.monthDataPoints) {
        id = action.monthDataPoints.id
    } else {
        return state
    }
    switch (action.type) {
    case 'addMonthDatapoints':
        if (state.find((dp) => dp.id === id)) {
            return state.map(mdp => {
                if (mdp.id === id) {
                    return action.monthDataPoints
                } else {
                    return mdp
                }
            })
        } else {
            return state.concat(action.monthDataPoints)
        }
    default:
        return state
    }
}

export const addDataPoint = (datapoint, token) => {
    return async dispatch => {
        try {
            const dataPoint = await dataService.addDataPoint(datapoint, token)
            if (dataPoint) {
                dispatch(setNotification('data','Added a new datapoint!', 5, true))
            }
        } catch (e) {
            dispatch(setNotification('data', 'Failed to add a new datapoint', 5, false))
        }
    }
}

export const fetchMonthInfo = (date, token) => {
    return async dispatch => {
        try {
            const dataPoints = await dataService.getMonthData(date, token)
            dispatch({
                type: 'addMonthDatapoints',
                monthDataPoints: {
                    id: `y${date.year}m${date.month}`,
                    dataPoints
                }
            })
        } catch (e) {
            dispatch(setNotification('month', 'Failed to fetch month data', 5, false))
        }
    }
}
export default dataReducer
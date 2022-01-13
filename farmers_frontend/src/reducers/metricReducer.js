import dataService from '../services/dataService'
import { setNotification } from './notificationReducer'

const metricReducer = (state = [], action) => {
    let metric
    if (action.data) {
        metric = action.data.metric
    } else {
        return state
    }
    switch (action.type) {
    case 'addMetricData':
        if (state.find((data) => data.metric ===  metric)) {
            return state.map(data => {
                if (data.metric === metric) {
                    return action.data.dataPoints
                } else {
                    return data
                }
            })
        } else {
            return state.concat(action.data)
        }
    default:
        return state
    }
}

export const addMetricData = (metric, token) => {
    return async dispatch => {
        try {
            const dataPoints = await dataService.getMetricStats(metric,token)
            if (dataPoints) {
                dispatch({
                    type: 'addMetricData',
                    data: {
                        metric,
                        dataPoints
                    }
                })
            }
        } catch (e) {
            dispatch(setNotification('metric', 'Failed to fetch data', 5, false))
        }
    }
}

export default metricReducer
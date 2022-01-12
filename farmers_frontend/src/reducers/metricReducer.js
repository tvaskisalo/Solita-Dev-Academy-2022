import dataService from "../services/dataService";
import { setNotification } from "./notificationReducer";

const metricReducer = (state = [], action) => {
    switch (action.type) {
        case 'addMetricData':
            const metric = action.data.metric;
            if (state.find((data) => data.metric ===  metric)) {
                return state.map(data => {
                    if (data.metric === metric) {
                        return action.data.dataPoints
                    } else {
                        return data;
                    }
                })
            } else {
                return state.concat(action.data)
            }
        default:
            return state;
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
                dispatch(setNotification('metric', 'success', 5))
            } 
        } catch (e) {
            dispatch(setNotification('metric', 'failure', 5))
            console.log(e.message);
        }
    }
}

export default metricReducer
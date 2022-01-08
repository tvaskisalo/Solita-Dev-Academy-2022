import dataService from "../services/dataService";

const dataReducer = (state = [], action) => {
    switch (action.type) {
        case 'addDataPoint':
            return state.concat(action.datapoint)
        default:
            return state;
    }
}

export const addDataPoint = (datapoint, token) => {
    return async dispatch => {
        try {
            const dataPoint = await dataService.addDataPoint(datapoint, token)
            dispatch({
                type: 'addDataPoint',
                datapoint
            })
        } catch (e) {
            console.log(e.message);
        }
    }
}

export default dataReducer
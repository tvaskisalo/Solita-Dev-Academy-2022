import dataService from "../services/dataService";

const statisticsReducer = (state = [], action) => {
    switch (action.type) {
        case 'addMonthStatistic':
            const id = action.monthStatistics.id;
            if (state.find((month) => month.id === id)) {
                console.log('found');
                return state.map(mStat => {
                    if (mStat.id === id) {
                        return action.monthStatistics;
                    } else {
                        return mStat;
                    }   
                }) 
            } else {
                return state.concat(action.monthStatistics);
            }
    
        default:
            return state;
    }
}

export const fetchMonthStatistics = (date, token) => {
    return async dispatch => {
        try {
            const monthStats = await dataService.getMonthStats(date,token);
            console.log(monthStats);
            dispatch({
                type: 'addMonthStatistic',
                monthStatistics: {
                    id: `y${date.year}m${date.month}`,
                    monthStats: monthStats[0]
                }
            })
        } catch (e) {
            console.log(e.message);
        }
    }
}

export default statisticsReducer;
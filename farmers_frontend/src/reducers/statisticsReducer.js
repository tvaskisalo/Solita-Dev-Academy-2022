import dataService from '../services/dataService'
import { setNotification } from './notificationReducer'

const statisticsReducer = (state = [], action) => {
    let id
    if (action.monthStatistics) {
        id = action.monthStatistics.id
    } else {
        return state
    }
    switch (action.type) {
    case 'addMonthStatistic':
        if (state.find((month) => month.id === id)) {
            return state.map(mStat => {
                if (mStat.id === id) {
                    return action.monthStatistics
                } else {
                    return mStat
                }
            })
        } else {
            return state.concat(action.monthStatistics)
        }
    default:
        return state
    }
}

export const fetchMonthStatistics = (date, token) => {
    return async dispatch => {
        try {
            const monthStats = await dataService.getMonthStats(date,token)
            dispatch({
                type: 'addMonthStatistic',
                monthStatistics: {
                    id: `y${date.year}m${date.month}`,
                    monthStats: monthStats[0]
                }
            })
        } catch (e) {
            dispatch(setNotification('month', 'Failed to fetch month stats', 5, false))
        }
    }
}

export default statisticsReducer
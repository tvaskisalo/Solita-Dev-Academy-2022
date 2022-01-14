//This file is responsible for user state management

import loginService from '../services/loginService'
import { resetMonthDatapoints } from './dataReducer'
import { resetDate } from './dateReducer'
import { resetMetricData } from './metricReducer'
import { setNotification } from './notificationReducer'
import { resetStats } from './statisticsReducer'

const userReducer = (state = { username: '', token: '' }, action) => {
    switch (action.type) {
    case 'removeUser':
        return { username: '', token: '' }
    case 'setUser':
        return action.user
    default:
        return state
    }
}

export const login = (username, password) => {
    return async  dispatch => {
        try {
            const user = await loginService.login(username,password)
            if (user) {
                dispatch({
                    type: 'setUser',
                    user
                })
            }
        } catch (e) {
            dispatch(setNotification('user', 'Failed to log in', 5, false))
        }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({
            type: 'removeUser',
            user: null
        })
        dispatch(resetStats())
        dispatch(resetMetricData())
        dispatch(resetMonthDatapoints())
        dispatch(resetDate())
    }
}

export default userReducer
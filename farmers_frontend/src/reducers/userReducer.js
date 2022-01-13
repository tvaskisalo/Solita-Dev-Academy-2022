//This file is responsible for user state management

import loginService from '../services/loginService'
import { setNotification } from './notificationReducer'

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
    return ({
        type: 'removeUser',
        user: null
    })
}

export default userReducer
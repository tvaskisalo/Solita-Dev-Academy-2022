//This file is responsible for user state management

import loginService from '../services/loginService'

const userReducer = (state = {username: '', token: ''}, action) => {
    switch (action.type) {
        case 'removeUser':
            return {username: '', token: ''}
        case 'setUser':
            return action.user
        default: 
            return state;
    }
}

export const login = (username, password) => {
    return async  dispatch => {
        try {
            const user = await loginService.login(username,password);
            if (user) {
                dispatch({type: 'setUser',
                    user
                })
            }
        } catch (e) {
            console.log(e.message);
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
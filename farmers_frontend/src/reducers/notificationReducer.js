//This file is copied from https://github.com/tvaskisalo/FullStack2021part6/blob/main/redux-anecdotes-main/src/reducers/notificationReducer.js

const reducer = (state = [],action) => {
    switch (action.type) {
    case 'SetNotification':
        if (state.find((t) => t.type === action.data.type)) {
            return state.map(t => {
                if (t.type === action.data.type) {
                    return { type: t.type, text: action.data.notification, hide:false, timeout : t.timeout, positive: action.data.positive }
                } else {
                    return t
                }
            })
        } else {
            return state.concat({ type: action.data.type, text: action.data.notification, hide:false, timeout : action.data.timeout, positive: action.data.positive })
        }
    case 'Hide':
        return state.map(t => {
            if (t.type === action.data.type) {
                return { type: t.type, text: '', hide: true }
            } else {
                return t
            }
        })
    case 'ClearTime':
        clearTimeout(state.find((t) => t.type === action.data.type))
        return state.map(t => {
            if (t.type === action.data.type) {
                return { ...t, timeout:null }
            } else {
                return t
            }
        })
    case 'SetTime':
        return state.map(t => {
            if (t.type === action.data.type) {
                return { ...t, timeout: action.data.timeout }
            } else {
                return t
            }
        })
    default: return state
    }
}

export const hideNotification = (type) => {
    return {
        type: 'Hide',
        data: {
            type
        }
    }
}

export const setNotification = (type, notification, time, positive) => {
    return async dispatch => {
        dispatch({
            type: 'SetNotification',
            data: {
                type,
                notification,
                positive
            }
        })
        dispatch({ type:'ClearTime', data: { type } })
        const timeout = setTimeout(() => dispatch(hideNotification(type)), time*1000)
        dispatch({
            type: 'SetTime',
            data: {
                type,
                timeout
            }
        })
    }
}

export default reducer
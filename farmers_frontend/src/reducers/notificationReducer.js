//This file is copied from https://github.com/tvaskisalo/FullStack2021part6/blob/main/redux-anecdotes-main/src/reducers/notificationReducer.js

const reducer = (state = [],action) => {
    switch (action.type) {
        case 'SetNotification':
            if (state.find((t) => t.type === action.data.type)) {
                return state.map(t => {
                    if (t.type === action.data.type) {
                        return {type: t.type, text: action.data.notification, visibility:'visible', timeout : state.timeout};
                    } else {
                        return t
                    }
                }) 
            } else {
                return state.concat({type: action.data.type, text: action.data.notification, visibility:'visible', timeout : state.timeout});
            }
        case 'Hide':
            return state.map(t => {
                if (t.type === action.data.type) {
                    return {type: t.type, text: '', visibility: 'hidden'};
                } else {
                    return t
                }
            }) 
        case 'ClearTime':
            const d = state.find((t) => t.type === action.data.type)
            clearTimeout(d.timeout)
            return state.map(t => {
                if (t.type === action.data.type) {
                    return {...t, timeout:null};
                } else {
                    return t
                }
            })
        case 'SetTime':
            return state.map(t => {
                if (t.type === action.data.type) {
                    return {...t, timeout: action.data.timeout};
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

export const setNotification = (type, notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'SetNotification',
            data: {
                type,
                notification
            }
        })
        dispatch({type:'ClearTime', data: {type} })
        const timeout = await setTimeout(() => dispatch(hideNotification(type)), time*1000)
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
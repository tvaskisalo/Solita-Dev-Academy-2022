

const dateReducer = (state = '', action) => {
    switch (action.type) {
    case 'setDate':
        return action.date
    case 'resetDate':
        return ''
    default:
        return state
    }
}

export const resetDate = () => {
    return ({
        type: 'resetDate'
    })
}


export const setStateDate = (date) => {
    return dispatch => {
        dispatch({
            type: 'setDate',
            date
        })
    }
}

export default dateReducer
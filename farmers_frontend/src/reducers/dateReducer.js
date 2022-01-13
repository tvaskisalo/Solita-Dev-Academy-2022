

const dateReducer = (state = '', action) => {
    switch (action.type) {
    case 'setDate':
        return action.date
    default:
        return state
    }
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
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';


import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'

const reducer = combineReducers({
    user: userReducer,
    dataPoints: dataReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store;
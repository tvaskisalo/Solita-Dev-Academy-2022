import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';


import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import statisticsReducer from './reducers/statisticsReducer'
import notificationReducer from './reducers/notificationReducer'
import dateReducer from './reducers/dateReducer';
import metricReducer from './reducers/metricReducer';

const reducer = combineReducers({
    user: userReducer,
    dataPoints: dataReducer,
    monthStatistics: statisticsReducer,
    notification: notificationReducer,
    date: dateReducer,
    metricData: metricReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store;
import { Switch, Route, useHistory } from 'react-router-dom'
import LoginPage from './components/loginPage/loginPage'
import Menu from './components/menu'
import { useSelector } from 'react-redux'
import MonthDataPage from './components/monthDataPage/monthDataPage'
import MetricDataPage from './components/metricDataPage/metricDataPage'
import { useEffect, useState } from 'react'
import React from 'react'

const App = () => {
    const token = useSelector(state => state.user.token)
    const history = useHistory()
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        if (token !== '') {
            setLoggedIn(true)
            history.push('/monthData')
        } else {
            setLoggedIn(false)
            history.push('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])
    return (
        <div>
            <Menu loggedIn={loggedIn}/>
            <Switch>
                <Route path = '/login'>
                    <LoginPage/>
                </Route>
                <Route path = '/monthData'>
                    <MonthDataPage />
                </Route>
                <Route path = '/metricData'>
                    <MetricDataPage />
                </Route>
            </Switch>
        </div>
    )
}

export default App

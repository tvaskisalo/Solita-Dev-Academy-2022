
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { logout } from "../../reducers/userReducer";
import DataForm from "./dataForm";
import MonthForm from "./monthForm";
import MonthDisplay from "./monthDisplay";
import Notification from "../Notification";
import MetricForm from "./metricForm"



const Main = () => {
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const [formVisibility, setFormVisibility] = useState(false);
    const [monthVisibility, setMonthVisibility] = useState(false);
    const [metricVisibility, setMetricVisibility] = useState(false);

    if (token === '') {
        return <Redirect to="/login"/>
    }

    return <div>
        <div>
            <button onClick={() => dispatch(logout())} >logout</button>
            <button onClick={() => setFormVisibility(!formVisibility)}>Add new datapoint</button>
            <button onClick={() => setMonthVisibility(!monthVisibility)}>Fetch month data</button>
            <button onClick={ () => setMetricVisibility(!metricVisibility)}>Fetch data by metric</button>
        </div>
        <div>
            <Notification type={'data'} />
            <DataForm visibility={formVisibility}/>
            <MonthForm visibility={monthVisibility}/>
            <MetricForm visibility={metricVisibility}/>
            <MonthDisplay/>
        </div>
        
    </div>
}

export default Main
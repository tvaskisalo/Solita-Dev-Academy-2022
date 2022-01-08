
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { logout } from "../../reducers/userReducer";
import DataForm from "./dataForm";

const Main = () => {
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const [visibility, setVisibility] = useState(false);

    if (token === '') {
        return <Redirect to="/login"/>
    }

    return <div>
        <div>
            <button onClick={() => dispatch(logout())} >logout</button>
            <button onClick={() => setVisibility(!visibility)}>Add new datapoint</button>
        </div>
        <div>
            <DataForm visibility={visibility}/>
        </div>
        <div>Main page</div>
    </div>
}

export default Main
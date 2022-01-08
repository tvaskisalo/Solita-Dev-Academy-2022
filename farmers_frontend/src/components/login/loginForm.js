//This component is responsible for creating UI for login.
import React, { useState } from "react";
import { login } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(login(username, password))
        setPassword('')
        setUsername('')
    }

    return <form onSubmit={handleLogin}>
        <div>username</div>
        <input type="text" value={username} onChange={({target}) => setUsername(target.value)} />
        <div>password</div>
        <input type="text" value={password} onChange={({target}) => setPassword(target.value)} />
        <div>
            <button type='submit'>Submit</button>
        </div>
    </form>
}

export default LoginForm;
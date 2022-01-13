//This component is responsible for creating UI for login.
import React, { useState } from 'react'
import { login } from '../../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Box, Input, InputLabel, Button } from '@mui/material'

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

    return (
        <Box
            component = 'form'
            autoComplete = 'off'
            onSubmit = {handleLogin}
        >
            <InputLabel htmlFor = 'username'>Username</InputLabel>
            <Input id = 'username' placeholder = 'username' value = {username} onChange = {({ target })  => setUsername(target.value)}/>
            <InputLabel htmlFor = 'password'>Password</InputLabel>
            <Input placeholder = 'password' id = 'password' value = {password} onChange = {({ target })  => setPassword(target.value)}/>
            <div></div>
            <Button type = 'submit' variant = 'contained'>Submit </Button>
        </Box>
    )
}

export default LoginForm
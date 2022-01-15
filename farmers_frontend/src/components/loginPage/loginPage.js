import React from 'react'
import LoginForm from './loginForm'
import Notification from '../Notification'

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-30%, -30%)',
}
//Renders whole login page
const LoginPage = () => {
    return <div style = {style}>
        <Notification type = 'user' />
        <LoginForm/>
    </div>
}

export default LoginPage
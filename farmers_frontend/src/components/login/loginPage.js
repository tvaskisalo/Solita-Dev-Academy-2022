import React from "react";
import { Link, Redirect } from "react-router-dom";
import LoginForm from "./loginForm";
import { useSelector } from "react-redux";

const LoginPage = () => {
    const token = useSelector(state => state.user.token);
    if (token !== '') {
        console.log("token is "+token);
        return <Redirect to='/' />
    }
    return <div>
        <LoginForm/>
    </div>
}

export default LoginPage;
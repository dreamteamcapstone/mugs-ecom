import React, { useState } from "react";
import { authenticateUser } from "../api/auth";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css"
const Login = ({user, setToken, setIsLoggedIn, setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await authenticateUser({email: email, password: password});
        // console.log(data);
        // console.log(data.user);
        if(data.token) {
            setToken(data.token);
            setIsLoggedIn(true);
            setUser(data.user);
        } else {alert('Incorrect Username or Password, please try again')}
        setEmail("");
        setPassword("");
        navigate('/');
    }
    
    return(
        <div className="loginWindow">

        <div className="login">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit} className="loginForm">
            <input
            placeholder="email" value={email} onChange={(event) => setEmail(event.target.value.toLowerCase())}
            ></input>
            <input
            placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button type="submit">Login</button>
        </form>
        <div className="registerLink">If you don't have an account create one <NavLink to="/register">here</NavLink>.</div>
        </div>
        </div>
    )
}

export default Login;
import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import { authenticateUser } from "../api/auth";
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({setToken, setIsLoggedIn, setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await authenticateUser({email: email, password: password});
        console.log(data);
        if(data.token) {
            console.log("Data:", data)
            setToken(data.token);
            setIsLoggedIn(true);
            setUser(data.user);
        } else {alert('Incorrect Username or Password, please try again')}
        setEmail("");
        setPassword("");
        navigate('/profile');
    }
    
    return(
        <>
        <div className="login">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit} className="loginForm">
            <input
            placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}
            ></input>
            <input
            placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button type="submit">Login</button>
        </form>
        <div>If you don't have an account create one <NavLink to="/register">here</NavLink>.</div>
        </div>
        </>
    )
}

export default Login;
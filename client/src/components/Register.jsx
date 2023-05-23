import React, { useState } from "react";
import { authenticateNewUser } from "../api/auth";

const Register = ({setToken, setIsLoggedIn, setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("hit the handle submit");
        const data = await authenticateNewUser({email: email, password: password});
        if(data.token) {
            console.log("Data:", data)
            setToken(data.token);
            setIsLoggedIn(true);
            setUser(data.user);
        } else { alert('That username is taken!') }
        setEmail("");
        setPassword("");
    }

    return(
        <>
        <div className="register">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="registerForm">
            <input
            type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}
            required
            ></input>
            <input
            minLength='8' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}
            required
            ></input>
            <button type="submit">Submit</button>
        </form>
        
        </div>
        </>
    )
}

export default Register;
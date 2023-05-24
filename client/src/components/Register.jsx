import React, { useState } from "react";
import { authenticateNewUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { createUserOrder } from "../api/indexAPI";

const Register = ({setToken, setIsLoggedIn, setUser, user, token}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await authenticateNewUser({email: email, password: password, firstName: firstName, lastName: lastName, address: address, phoneNumber: phoneNumber});
        console.log(data)
        if(data.token) {
            setToken(data.token);
            setIsLoggedIn(true);
            setUser(data.user);
            // const order = await createUserOrder({userId: user.id, purchased: false}, token)
        } else { alert('That username is taken!') }
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setAddress("");
        setPhoneNumber("");
        navigate("/");
    }

    return(
        <>
        <div className="register">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="registerForm">
            <input
            type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value.toLowerCase())}
            required
            ></input>
            <input
            minLength='8' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}
            required
            ></input>
            <input
            placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)}
            ></input>
            <input
            placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)}
            ></input>
            <input
            placeholder="Address" value={address} onChange={(event) => setAddress(event.target.value)}
            ></input>
            <input
            placeholder="Phone Number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}
            ></input>
            <button type="submit">Submit</button>
        </form>
        
        </div>
        </>
    )
}

export default Register;
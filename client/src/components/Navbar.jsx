import React from "react";
import { NavLink } from 'react-router-dom';

const Navbar = ({ setUser, setIsLoggedIn, isLoggedIn, setToken }) => {
    return (
        <>
        {isLoggedIn ? (

            <nav>
            <h1>Mugs-A-Million</h1>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/myprofile">My Profile</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/" onClick={() => {
                    setIsLoggedIn(false)
                    setUser({})
                    setToken("")
                    localStorage.removeItem("token")
                }}>Logout</NavLink>
            </div>
            </nav>

        ) : (
            <nav>
                <h1>Mugs-A-Million</h1>
                <div>
                 <NavLink to="/">Home</NavLink>
                 <NavLink to="/login">Login</NavLink>
                 <NavLink to="/myprofile">My Profile</NavLink>
                 <NavLink to="/cart">Cart</NavLink>
                </div>
            </nav>
        )}
        </>
    )
}





export default Navbar;
import React from "react";
import { NavLink } from 'react-router-dom';

const Navbar = ({ user, setUser, setIsLoggedIn, isLoggedIn, setToken }) => {
    return (
        <>
        {isLoggedIn ? (

            <nav className='navbar'>
            <h1 className='title'>Mugs-A-Million</h1>
            <div>
                <p>Hello, <NavLink to="/myprofile">{user.firstName}</NavLink></p>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/profile">My Profile</NavLink>
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
            <nav className='navbar'>
                <h1 className='title'>Mugs-A-Million</h1>
                <div>
                 <NavLink to="/">Home</NavLink>
                 <NavLink to="/cart">Cart</NavLink>
                 <NavLink to="/login">Login</NavLink>
                </div>
            </nav>
        )}
        </>
    )
}





export default Navbar;
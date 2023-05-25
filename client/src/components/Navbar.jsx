import React from "react";
import { NavLink } from 'react-router-dom';
import "./Home.css"

const Navbar = ({ user, setUser, setIsLoggedIn, isLoggedIn, setToken, setCart }) => {

    return (
        <>
        {isLoggedIn ? (

            <nav className='navbar'>
            <h1 className='title'>Mugs-A-Million</h1>
                {/* s<p>Hello, <NavLink to="/profile">{user.firstName}</NavLink></p> */}
                <div className="links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/cart">Cart</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/" onClick={() => {
                    setIsLoggedIn(false)
                    setUser({})
                    setToken("")
                    setCart({})
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
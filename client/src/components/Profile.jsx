import React, { useState, useEffect } from "react"
import {fetchUserOrders} from '../api/indexAPI'
import "./Profile.css"
const Profile = ({isLoggedIn, user, token}) => {
    const [userOrders, setUserOrders] = useState([])
    // console.log(userOrders);
    useEffect(() => {
        const getOrderHistory = async () => {
            const allUserOrders = await fetchUserOrders(user, token);
            const orderHistory = allUserOrders.filter(order => order.purchased === true);
            setUserOrders(orderHistory);
        };
        getOrderHistory();
    }, [])

    return (
        <>
        {isLoggedIn ? 
        (<div className="profile">
            <h2>Your Account Info</h2>
            <ul className="persInfo"> 
                <li>Name:{user.firstName} {user.lastName}</li>
                <li>Email: {user.email}</li>
                <li>Shipping Address: {user.address}</li>
                <li>Phone: {user.phoneNumber}</li>
            </ul>
            <h2>Your Order History:</h2>
            <div className="orders">
            {userOrders.map((order) => {
                return(
                    <div className="order" key={order.id}>
                        <h5>Order#: {order.id}</h5>
                        {order.products.map((product) => {
                            return(
                                <div className="product" key={product.id}>
                                    <ul>
                                        <li>Item: {product.name}</li>
                                        <li>Qty: {product.quantity}</li>
                                        <li>Price: {product.purchasePrice}</li>
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                )
            })}</div>
        </div>) 
        : 
        (<>
            <h1>You need to be logged in to view your profile</h1>
        </>)
        }
        </>
    )
}

export default Profile
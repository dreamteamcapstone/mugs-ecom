import React, { useState, useEffect } from "react"
import {fetchUserOrders} from '../api/indexAPI'

const Profile = ({isLoggedIn, user, token}) => {
    const [userOrders, setUserOrders] = useState([])
    console.log(userOrders);
    useEffect(() => {
        const getOrderHistory = async () => {
            const allUserOrders = await fetchUserOrders(user, token);
            setUserOrders(allUserOrders);
            console.log(allUserOrders)
        };
        getOrderHistory();
    }, [])

    return (
        <>
        {isLoggedIn ? 
        (<>
            <h2>Your Account Info</h2>
            <ul>
                <li>Email: {user.email}</li>
                <li>Address: {user.address}</li>
                <li>Phone: {user.phoneNumber}</li>
            </ul>
            <h3>Your Order History:</h3>
            {userOrders.map((order) => {
                return(
                    <div key={order.id}>
                        <h5>{order.id}</h5>
                        {order.products.map((product) => {
                            return(
                                <div key={product.id}>
                                    <ul>
                                        <li>{product.name}</li>
                                        <li>{product.quantity}</li>
                                        <li>{product.purchasePrice}</li>
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </>) 
        : 
        (<>
            <h1>You need to be logged in to view your profile</h1>
        </>)
        }
        </>
    )
}

export default Profile
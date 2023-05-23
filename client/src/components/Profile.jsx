import React, { useState, useEffect } from "react"
import {fetchUserOrders} from '../api/indexAPI'

const Profile = ({isLoggedIn, user, token}) => {
    const [userOrders, setUserOrders] = useState([])
    console.log(userOrders);
    useEffect(() => {
        const getOrderHistory = async () => {
            const userPurchasedOrders = await fetchUserOrders(user, token);
            setUserOrders(userPurchasedOrders);
            console.log(userOrders);
        };
        getOrderHistory();
    }, [])

    return (
        <>
        {isLoggedIn ? 
        (<>
            <h2>Your Account Info</h2>
            <h3>Customer Info:</h3>
            {userOrders.map((order) => {
                return(
                    <div key={order.id} ClassName='profileOrder'>
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
            <h3>Your Order History:</h3>
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
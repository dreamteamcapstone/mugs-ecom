import React, {useState, useEffect} from "react";

const Cart = ({cart}) => {

//useEffect for dependency on cart
    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.products && cart.products.map(product => {
                return(
                    <ul className="lineItem">
                        <li>{product.name}</li>
                        <li>{product.quantity}</li>
                        <li>{product.price}</li>
                    </ul>
                )
            })}
            
        </div>
    )
}

export default Cart


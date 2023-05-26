import React, {useState} from "react";
import { editOrder, createUserOrder } from "../api/indexAPI";
import {useNavigate} from "react-router-dom";

const Checkout = ({user, token, items, cart, setCart}) => {
    const navigate = useNavigate();

    const handlePurchase = async (event, token, user, cart) => {
        console.log(cart.id);
        const purchaseOrder = await editOrder(token, {orderId: cart.id, userId: user.id, purchased: true});
        console.log(purchaseOrder);
        const newUserOrder = await createUserOrder({userId: user.id, purchased: false,}, token)
        console.log(newUserOrder);
        setCart(newUserOrder);
    }
    return (
        <div className="cart">
          <h2>Order Summary</h2>
          <div>
                    <ul key="user.id">
                        <li>Shipping Information:</li>
                        <li>{user.firstName}</li>
                        <li>{user.lastName}</li>
                        <li>{user.address}</li>
                        <li>{user.phoneNumber}</li>
                        <li>{user.email}</li>
                    </ul>
            </div>
          {items &&
            items.map((product) => {
              return (
                <div className="product-container" key={product.id}>
                  <ul className="lineItems">
                    <li>{product.productId}</li>
                    <li>Qty:{product.quantity}</li>
                    <li>{product.purchasePrice}</li>
                  </ul>
                </div>
              );
            })}
          <h3 className="total">Total: $</h3>
          <button className="checkoutBtn" onClick={(event) => {navigate('/cart')}}>Go Back</button>
          <button className="checkoutBtn" onClick={(event) => handlePurchase(event, token, user, cart)}>Place Order</button>
        </div>
      );
}

export default Checkout

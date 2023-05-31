import React, {useState} from "react";
import { editOrder, createUserOrder } from "../api/indexAPI";
import {useNavigate} from "react-router-dom";

const Checkout = ({user, token, items, cart, setCart, products}) => {
    const navigate = useNavigate();

    const handleTotal = function(){
      let num = 0
      for (let i=0; i < items.length; i++) {
        let lineItemPrice = +items[i].purchasePrice.substring(1);
        let lineItemQty = +items[i].quantity;
        let lineItemTotal = lineItemPrice * lineItemQty;
        num += lineItemTotal;
      }
      return num;
    }

    const handlePurchase = async (event, token, user, cart) => {
        console.log(cart.id);
        const purchaseOrder = await editOrder(token, {orderId: cart.id, userId: user.id, purchased: true});
        const newUserOrder = await createUserOrder({userId: user.id, purchased: false,}, token)
        setCart(newUserOrder);
        navigate('/orderplaced');
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
            items.map((orderProduct) => {
              const currentCart = products.filter(product => orderProduct.productId === product.id);
              return (
                <div className="product-container" key={orderProduct.id}>
                  <ul className="lineItems">
                    <li><img className="icon" src={currentCart[0].imageUrl}/></li>
                    <li>{currentCart[0].name}</li>
                    <li>Qty:{orderProduct.quantity}</li>
                    <li>{orderProduct.purchasePrice}/mug</li>
                    <li>Total: ${+orderProduct.purchasePrice.substring(1) * +orderProduct.quantity}</li>
                  </ul>
                </div>
              );
            })}
          <h3 className="total">Total: ${handleTotal()}</h3>
          <button className="checkoutBtn" onClick={(event) => {navigate('/cart')}}>Go Back</button>
          <button className="checkoutBtn" onClick={(event) => handlePurchase(event, token, user, cart)}>Place Order</button>
        </div>
      );
}

export default Checkout

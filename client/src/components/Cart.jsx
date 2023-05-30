import React, { useState, useEffect } from "react";
import {
  fetchUserOrders,
  fetchOrderProducts,
  updateCartItem,
  removeCartItem,
  fetchCart,
} from "../api/indexAPI";
import { useNavigate } from 'react-router-dom';
import "./Cart.css";

const Cart = ({ cart, token, setCart, user, setItems, items}) => {
  const navigate = useNavigate();

  console.log(items)

  useEffect(() => {
    const getOrderItems = async () => {
      console.log(cart);
      const orderItems = await fetchOrderProducts(token, cart.id);
      const cartWithProds = await fetchCart(token, cart.id);
      console.log(cartWithProds);
      const prods = cartWithProds[0].products;
      console.log(prods);
      setItems(orderItems);
      console.log(items);
      console.log(orderItems);
    }
    getOrderItems();
  }, [cart]);

  console.log(cart);


  const handleQuantity = async (event, product) => {
    const updatedProduct = await updateCartItem({id: +orderProduct.id, quantity: +event.target.value, purchasePrice: orderProduct.purchasePrice})
        console.log(updatedProduct);
      if(updatedProduct.id) {
          setItems(items);
      }
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items &&
        items.map((orderProduct) => {
          return (
            <div className="product-container" key={orderProduct.id}>
              <ul className="lineItems">
                <li><img className="icon" src={orderProduct.imageUrl}/></li>
                <li>{orderProduct.id}</li>
                <li>Qty:
                  <input className="qty"
                    onChange={(event) => handleQuantity(event, orderProduct)}
                    type="number"
                    id="quantity"
                    placeholder={orderProduct.quantity}
                    min="1"
                    max="5"
                  />
                </li>
                <li>{orderProduct.purchasePrice} /mug</li>
                <li>
                  <button className="deleteCartItem"
                    onClick={async () => {
                      console.log(orderProduct.id);
                      await removeCartItem(orderProduct.id);
                      const userOrders = await fetchUserOrders(user, token);
                      
                      console.log(userOrders);
                      const openOrder = userOrders.find(
                        (order) => order.purchased === false
                      );

                      console.log(openOrder);
                      setCart(openOrder);
                    }}
                  >
                    X
                  </button>
                  </li>
              </ul>
            </div>
          );
        })}
      <h3 className="total">Total: $</h3>
      <button className="checkoutBtn" onClick={(event) => {navigate('/')}}>Keep Shopping</button>
      <button className="checkoutBtn" onClick={(event) => {navigate('/checkout')}}>Checkout</button>
    </div>
  );
};

export default Cart;

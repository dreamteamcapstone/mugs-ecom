import React, { useState, useEffect } from "react";
import {
  fetchUserOrders,
  fetchOrderProducts,
  updateCartItem,
  removeCartItem,
} from "../api/indexAPI";
import { useNavigate } from 'react-router-dom';
import "./Cart.css";
const Cart = ({ cart, token, setCart, user, setItems, items }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderItems = async () => {
      console.log(cart);
      const orderItems = await fetchOrderProducts(token, cart.id);
      setItems(orderItems);
      console.log(orderItems);
    };
    getOrderItems();
  }, [cart]);

  console.log(cart);
  console.log(items);

  const handleQuantity = async (event, product) => {
      console.log(product);
      console.log(+event.target.value);
      console.log(product.id);
      console.log(typeof product.purchasePrice);
    //   const updatedProduct = await updateCartItem({id: product.id, quantity: event.target.value, purchasePrice: product.purchasePrice})
    const updatedProduct = await updateCartItem(
        {id: product.id, quantity: event.target.value, purchasePrice: product.purchasePrice })
    console.log(updatedProduct);
      if(!updatedProduct.error & updatedProduct.id) {
          const updatedOrderItems = items.filter(item => item.id !== product.id)
          setItems(updatedOrderItems);
      }
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items &&
        items.map((product) => {
          return (
            <div className="product-container" key={product.id}>
              <ul className="lineItems">
                <li>{product.productId}</li>
                <li>
                  <input className="qty"
                    onChange={(event) => handleQuantity(event, product)}
                    type="number"
                    id="quantity"
                    placeholder={product.quantity}
                    min="1"
                    max="5"
                  />
                  Qty:{product.quantity}
                </li>
                <li>{product.purchasePrice}</li>
                <li>
                  <button className="deleteCartItem"
                    onClick={async () => {
                      console.log(product.id);
                      const deletedItem = await removeCartItem(product.id);
                      console.log(deletedItem);
                      const userOrders = await fetchUserOrders(user, token);
                      console.log(userOrders);
                      const openOrder = userOrders.find(
                        (order) => order.purchased === false
                      );
                      // console.log("hi", userOrders.find(order => order.purchased === false));
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

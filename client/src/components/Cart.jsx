import React, { useState, useEffect } from "react";
import {
  fetchUserOrders,
  fetchOrderProducts,
  updateCartItem,
  removeCartItem,
} from "../api/indexAPI";
import { useNavigate } from 'react-router-dom';
import "./Cart.css";

const Cart = ({ cart, token, setCart, user, setItems, items, products}) => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0.00);

  useEffect(() => {
    const getOrderItems = async () => {
      const orderItems = await fetchOrderProducts(token, cart.id);
      setItems(orderItems);
    }
    getOrderItems();
  }, [cart]);

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

  const handleQuantity = async (event, orderProduct) => {
    const updatedProduct = await updateCartItem({id: +orderProduct.id, quantity: +event.target.value, purchasePrice: orderProduct.purchasePrice})
      if(updatedProduct.id) {
          setItems(items);
          const userOrders = await fetchUserOrders(user, token);
                      const openOrder = userOrders.find(
                        (order) => order.purchased === false
                      );
                      setCart(openOrder);
      }
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items &&
        items.map((orderProduct) => {
          const currentCart = products.filter(product => orderProduct.productId === product.id);
          
          return (
            <div className="product-container" key={orderProduct.id}>
              <ul className="lineItems">
                <li><img className="icon" src={currentCart[0].imageUrl}/></li>
                <li>{currentCart[0].name}</li>
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
                <li>Total: ${+orderProduct.purchasePrice.substring(1) * +orderProduct.quantity}</li>
                <li>
                  <button className="deleteCartItem"
                    onClick={async () => {
                      await removeCartItem(orderProduct.id);
                      const userOrders = await fetchUserOrders(user, token);
                      
                      const openOrder = userOrders.find(
                        (order) => order.purchased === false
                      );

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
      <h3 className="total">Total: ${handleTotal()}</h3>
      <button className="checkoutBtn" onClick={(event) => {navigate('/')}}>Keep Shopping</button>
      <button className="checkoutBtn" onClick={(event) => {navigate('/checkout')}}>Checkout</button>
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import {
  fetchUserOrders,
  fetchOrderProducts,
  updateCartItem,
  removeCartItem,
} from "../api/indexAPI";
import "./Cart.css";
const Cart = ({ cart, token, setCart, user }) => {
  const [items, setItems] = useState([]);
  //useEffect for dependency on cart

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

  // const handleQuantity = async (event, product) => {
  //     console.log(product);
  //     const totalItemPrice = product.quantity * product.purchasePrice;
  //     const updatedProduct = await updateCartItem({id: product.id, quantity: event.target.value, purchasePrice: totalItemPrice})
  //     console.log(updatedProduct);
  //     if(!updatedProduct.error & updatedProduct.id) {
  //         const updatedOrderItems = items.filter(item => item.id !== product.id)
  //         setItems(updatedOrderItems);
  //     }
  // }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items &&
        items.map((product) => {
          return (
            <div className="product-container" key={product.id}>
              <ul className="lineItems">
                <li>{product.productId}</li>
                <li>{product.purchasePrice}</li>
                <li>Qty:{product.quantity}</li>
              <li><input
                onChange={async function handleQuantity(event, product) {
                  console.log(product);
                  const totalItemPrice =
                    product.quantity * product.purchasePrice;
                  const updatedProduct = await updateCartItem({
                    id: product.id,
                    quantity: event.target.value,
                    purchasePrice: totalItemPrice,
                  });
                  console.log(updatedProduct);
                  if (!updatedProduct.error & updatedProduct.id) {
                    const updatedOrderItems = items.filter(
                      (item) => item.id !== product.id
                    );
                    setItems(updatedOrderItems);
                  }
                }}
                type="number"
                id="quantity"
                // value={product.quantity}
                placeholder={product.quantity}
                min="1"
                max="5"
              /></li>
              <li><button
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
                Remove From Cart
              </button></li>
              </ul>
              </div>
          );
        })}
        <h3 className="total">Total: $</h3>
        <button className="checkoutBtn">Checkout</button>
    </div>
  );
};

export default Cart;

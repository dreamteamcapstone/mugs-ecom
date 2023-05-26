import React from "react";
import { useNavigate } from "react-router-dom";
import { addProductToOrder } from "../api/indexAPI";
import "./SingleProduct.css"
const SingleProduct = ({ selectedProduct, token , cart, setCart}) => {
  const navigate = useNavigate();
  console.log("Cart:", cart)

  const addToCart = async (event) => {
    const product = await addProductToOrder(token, cart.id, {productId: selectedProduct.id, quantity: 1, purchasePrice: selectedProduct.price})
    console.log("Data from addTOCart:", cart.id)
    console.log("Added Product:", product)
    navigate('/cart')
  }
     
     if(selectedProduct.inventory > 0){
        
         return (
             <>
             <button className="close" onClick={() => {
                navigate('/')
                }}>X</button>
                <div className="single-product-container">
                <img className="prodImg" src={selectedProduct.imageUrl}/>
                   <div className="prodText">
                     <h2>{selectedProduct.name}</h2>
                     <p>{selectedProduct.description}</p>
                     <p>{selectedProduct.price}</p>
                     <button onClick= { addToCart }>Add to Cart</button>
                   </div>
                </div>
             </>
         )
     } else {

        return (
            <>
            <button className="close" onClick={() => {
               navigate('/')
               }}>X</button>
               <div className="single-product-container">
               <img className="prodImg" src={selectedProduct.imageUrl}/>
                  <div className="prodText">
                    <h2>{selectedProduct.name}</h2>
                    <p>{selectedProduct.description}</p>
                    <p>{selectedProduct.price}</p>
                    <button>Out Of Stock</button>
                  </div>
               </div>
            </>
        )
     }
}


export default SingleProduct;
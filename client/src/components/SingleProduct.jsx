import React from "react";
import { useNavigate } from "react-router-dom";
import { addProductToOrder } from "../api/indexAPI";

const SingleProduct = ({ selectedProduct, token , cart, setCart}) => {
  const navigate = useNavigate();
  console.log("Cart:", cart)

  const addToCart = async (event) => {
    const product = await addProductToOrder(token, cart.id, {productId: selectedProduct.id, quantity: 1, purchasePrice: selectedProduct.price})
    console.log("Data from addTOCart:", cart.id)
    console.log("Added Product:", product)
  }
     
     if(selectedProduct.inventory > 0){
        
         return (
             <>
                <div>
                   <h2>{selectedProduct.name}</h2>
                   <p>{selectedProduct.description}</p>
                   <img src={selectedProduct.imageUrl}/>
                   <p>{selectedProduct.price}</p>
                </div>
             
                <button onClick= { addToCart }>Add to Cart</button>

                <button onClick={() => {
                navigate('/')
                }}>X</button>
             </>
         )
     } else {

        return (
            <>
               <div>
                  <h1>{selectedProduct.name}</h1>
                  <p>{selectedProduct.description}</p>
                  <img src={selectedProduct.imageUrl}/>
                  <p>{selectedProduct.price}</p>
                  
               </div>
            
               <button>Out Of Stock</button>
               <button onClick={() => {
                navigate('/')
                }}>X</button>
            </>
        )
     }
}


export default SingleProduct;
import React from "react";
import { useNavigate } from "react-router-dom";
import { addProductToOrder } from "../api/indexAPI";

const SingleProduct = ({ selectedProduct, token , cart}) => {
  const navigate = useNavigate();
//   console.log(cart)
  const addToCart = async (event) => {
    const product = await addProductToOrder(token, cart.id, {productId: selectedProduct.id, quantity: 1, purchasePrice: selectedProduct.price})
    console.log("Data from addTOCart:", cart.id)
    
  }
     
     if(selectedProduct.inventory > 0){
        console.log("Inventory:",selectedProduct.inventory)
         
         return (
             <>
                <div>
                   <h1>{selectedProduct.name}</h1>
                   <p>{selectedProduct.description}</p>
                   <img src={selectedProduct.imageUrl} alt="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" />
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
                  <p>{selectedProduct.imageUrl}</p>
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
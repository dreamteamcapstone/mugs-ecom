import React from "react";
import { useNavigate } from "react-router-dom";

const SingleProduct = ({ selectedProduct, setCart }) => {
  const navigate = useNavigate();
     
     if(selectedProduct.inventory > 0){
        console.log("Inventory:",selectedProduct.inventory)
         
         return (
             <>
                <div>
                   <h1>{selectedProduct.name}</h1>
                   <p>{selectedProduct.description}</p>
                   <p>{selectedProduct.imageUrl}</p>
                   <p>{selectedProduct.price}</p>
                   
                </div>
             
                <button>Add to Cart</button>

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
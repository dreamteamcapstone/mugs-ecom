import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProductToOrder, editProduct } from "../api/indexAPI";

const SingleProduct = ({ selectedProduct, token , cart, setCart, user}) => {
   const [productName, setProductName] = useState("");
   const [productDesc, setProductDesc] = useState("");
   const [productImage, setProductImage] = useState("");
   const [productPrice, setProductPrice] = useState("");
   const [productInventory, setProductInventory] = useState(selectedProduct.inventory);
   const navigate = useNavigate();
   console.log("Cart:", cart)

  const addToCart = async (event) => {
    const product = await addProductToOrder(token, cart.id, {productId: selectedProduct.id, quantity: 1, purchasePrice: selectedProduct.price})
    console.log("Data from addTOCart:", cart.id)
    console.log("Added Product:", product)
  }

  const handleEdit = async (event) => {
   event.preventDefault()
   const updatedProduct = await editProduct(token, {id: selectedProduct.id, name: productName, description: productDesc, imageUrl: productImage, price: productPrice, inventory: productInventory})
   console.log("Updated Product:", updatedProduct)
}

  if(user.admin){
   if(selectedProduct.inventory > 0){    
      return (
          <>
             <div>
                <h2>{selectedProduct.name}</h2>
                <p>{selectedProduct.description}</p>
                <img src={selectedProduct.imageUrl}/>
                <p>{selectedProduct.price}</p>
             </div>

             <form onSubmit={handleEdit}>Edit Product
                <input placeholder="name" value={productName} onChange={(event) => setProductName(event.target.value)}/>
                <input placeholder="description" value={productDesc} onChange={(event) => setProductDesc(event.target.value)}/>
                <input placeholder="imageUrl" value={productImage} onChange={(event) => setProductImage(event.target.value)}/>
                <input placeholder="price" value={productPrice} onChange={(event) => setProductPrice(event.target.value)}/>
                <input placeholder="inventory" value={productInventory} type="number" onChange={(event) => setProductInventory(event.target.value)}/>
                <button type="submit">Submit</button>
            </form>
          
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
  } else{
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
}


export default SingleProduct;
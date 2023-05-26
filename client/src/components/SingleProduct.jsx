import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SingleProduct.css"
import { addProductToOrder, editProduct, getSingleProduct } from "../api/indexAPI";

const SingleProduct = ({ selectedProduct, token , cart, setCart, user}) => {
   const [productName, setProductName] = useState(selectedProduct.name);
   const [productDesc, setProductDesc] = useState(selectedProduct.description);
   const [productImage, setProductImage] = useState(selectedProduct.imageUrl);
   const [productPrice, setProductPrice] = useState(selectedProduct.price);
   const [productInventory, setProductInventory] = useState(selectedProduct.inventory);
   const navigate = useNavigate();
   console.log("Cart:", cart)

   // useEffect(() => {
   //    const getProduct = async () => {
      //   const product = await getSingleProduct(selectedProduct.id);
   //      console.log(product);
   //    }
   //    getProduct();
   //  }, [])

  const addToCart = async (event) => {
    const product = await addProductToOrder(token, cart.id, {productId: selectedProduct.id, quantity: 1, purchasePrice: selectedProduct.price})
    console.log("Data from addTOCart:", cart.id)
    console.log("Added Product:", product)
    navigate('/cart')
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
                <img src={selectedProduct.imageUrl} height="500" width="500"/>
                <p>{selectedProduct.price}</p>
             </div>

             <form className="editForm" onSubmit={handleEdit}>Edit Product
             <div className="formInput">
               <label>Product Name</label>
                <input placeholder="name" value={productName} onChange={(event) => setProductName(event.target.value)}/>
             </div>
             <div className="formInput">
               <label>Description</label>
                <input placeholder="description" value={productDesc} onChange={(event) => setProductDesc(event.target.value)}/>
             </div>
             <div className="formInput">
               <label>Image URL</label>
                <input placeholder="imageUrl" value={productImage} onChange={(event) => setProductImage(event.target.value)}/>
             </div>
             <div className="formInput">
               <label>Price</label>
                <input placeholder="price" value={productPrice} onChange={(event) => setProductPrice(event.target.value)}/>
             </div>
             <div className="formInput">
               <label>Inventory Count</label>
                <input placeholder="inventory" value={productInventory} type="number" onChange={(event) => setProductInventory(event.target.value)}/>
             </div>
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
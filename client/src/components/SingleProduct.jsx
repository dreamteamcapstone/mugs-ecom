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

   // useEffect(() => {
   //    const getProduct = async () => {
      //   const product = await getSingleProduct(selectedProduct.id);
   //      console.log(product);
   //    }
   //    getProduct();
   //  }, [])

  const addToCart = async (event) => {
    const product = await addProductToOrder(token, cart.id, {productId: selectedProduct.id, quantity: 1, purchasePrice: selectedProduct.price})
    navigate('/cart')
  }

  const handleEdit = async (event) => {
   event.preventDefault()
   const updatedProduct = await editProduct(token, {id: selectedProduct.id, name: productName, description: productDesc, imageUrl: productImage, price: productPrice, inventory: productInventory})
}
// QUESTION: if not logged in don't let people see the add to cart button, maybe instead have the button say "login to make purchases"
  if(user.admin){
   if(selectedProduct.inventory > 0){    
      return (
          <>
             <div className="container">
                <h2 className="name">{selectedProduct.name}</h2>
                <img className="prodImg" src={selectedProduct.imageUrl}/>
                <p>{selectedProduct.description}</p>
                <p>{selectedProduct.price}</p>
                <button className="button" onClick= { addToCart }>Add to Cart</button>
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

          </>
      )
  } else {
     return (
       <>
         <div className="container">
            <div>
               <h1 className="name">{selectedProduct.name}</h1>
               <img className="prodImg" src={selectedProduct.imageUrl}/>
               <p className="description">{selectedProduct.description}</p>
               <p className="price">{selectedProduct.price}</p>
               <button className="button" >Out Of Stock</button>
            </div>
            <button className="button" onClick={() => {
             navigate('/')
             }}>X</button>
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
         </>
     )
  }
  } else{
   if(selectedProduct.inventory > 0){        
      return (
          <div className="container">
             <div className="container">
                <h2 className="name">{selectedProduct.name}</h2>
                <img className="prodImg" src={selectedProduct.imageUrl}/>
                <p className="description">{selectedProduct.description}</p>
                <p className="price">{selectedProduct.price}</p>
                <button className="button" onClick= { addToCart }>Add to Cart</button>

             </div>
          
             <button className="button" onClick={() => {
             navigate('/')
             }}>X</button>
          </div>
      )
  } else {
     return (
         <div className="container">
            <div className="container">
               <h1 className="name">{selectedProduct.name}</h1>
               <img className="prodImg" src={selectedProduct.imageUrl}/>
               <p className="description">{selectedProduct.description}</p>
               <p className="price">{selectedProduct.price}</p>
               <button className="button">Out Of Stock</button>
            </div>

            <button className="button" onClick={() => {
             navigate('/')
             }}>X</button>
         </div>
     )
  }
  }

}


export default SingleProduct;
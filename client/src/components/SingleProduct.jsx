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
   //  console.log("Data from addTOCart:", cart.id)
    console.log("Added Product:", product)
    navigate('/cart')
  }

  const handleEdit = async (event) => {
   event.preventDefault()
   const updatedProduct = await editProduct(token, {id: selectedProduct.id, name: productName, description: productDesc, imageUrl: productImage, price: productPrice, inventory: productInventory})
   console.log("Updated Product:", updatedProduct)
}
// QUESTION: if not logged in don't let people see the add to cart button, maybe instead have the button say "login to make purchases"
  if(user.admin){
   if(selectedProduct.inventory > 0){    
      return (
         <>
             <div>
               {/* QUESTION: do we need these buttons that navigate to home if the home button in navbar already does that? */}
                  <button onClick={() => {
                  navigate('/')
                  }}>Back</button>
                <h2>{selectedProduct.name}</h2>
                <div className="productView">
                <img src={selectedProduct.imageUrl} height="500" width="500"/>
                <div className="productInfo">
                <p className="price">{selectedProduct.price}</p>
                <p>About this item <br />{selectedProduct.description}</p>
                <button onClick= {() =>{ addToCart; navigate("/cart") }}>Add to Cart</button>
                </div>
                </div>
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
            <div>
                  <button onClick={() => {
                  navigate('/')
                  }}>Back</button>
                <h2>{selectedProduct.name}</h2>
                <div className="productView">
                <img src={selectedProduct.imageUrl} height="500" width="500"/>
                <div className="productInfo">
                <p className="price">{selectedProduct.price}</p>
                <p>About this item <br />{selectedProduct.description}</p>
             <button>Out of Stock</button>
                </div>
                </div>
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
          <>
             <div>
                  <button onClick={() => {
                  navigate('/')
                  }}>Back</button>
                <h2>{selectedProduct.name}</h2>
                <div className="productView">
                <img src={selectedProduct.imageUrl} height="500" width="500"/>
                <div className="productInfo">
                <p className="price">{selectedProduct.price}</p>
                <p>About this item <br />{selectedProduct.description}</p>
                <button onClick= {() =>{ addToCart; navigate("/cart") }}>Add to Cart</button>
                </div>
                </div>
             </div>
          </>
      )
  } else {
     return (
         <>
            <div>
                  <button onClick={() => {
                  navigate('/')
                  }}>Back</button>
                <h2>{selectedProduct.name}</h2>
                <div className="productView">
                <img src={selectedProduct.imageUrl} height="500" width="500"/>
                <div className="productInfo">
                <p className="price">{selectedProduct.price}</p>
                <p>About this item <br />{selectedProduct.description}</p>
             <button>Out of Stock</button>
                </div>
                </div>
             </div>
         </>
     )
  }
  }

}


export default SingleProduct;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, deleteProduct, fetchAllProducts } from "../api/indexAPI";
import './Home.css'
const Home = ( { products, setSelectedProduct, selectedProduct, user, token, setProducts } ) => {
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productInventory, setProductInventory] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
    }
    getData();
  }, [products])

  const handleCreate = async (event) => {
    event.preventDefault();
    const product = await createProduct(token, {name: productName, description: productDesc, imageUrl: productImage, price: productPrice, inventory: productInventory});
    console.log(product);
    setProductName("");
    setProductDesc("");
    setProductImage("");
    setProductPrice("");
    setProductInventory(0);
}

const handleDelete = async (event) => {
  event.preventDefault()
  const product = await deleteProduct(productId, token)
  console.log("Deleted product:", product);
}

  if(user.admin){
    return (
        <div className="grid-container">
          <form onSubmit={handleCreate} className="product-tile">Add New Product
                <input placeholder="name" type="text" value={productName} onChange={(event) => setProductName(event.target.value)}/>
                <input placeholder="description" type="text" value={productDesc} onChange={(event) => setProductDesc(event.target.value)}/>
                <input placeholder="imageUrl" type="text" value={productImage} onChange={(event) => setProductImage(event.target.value)}/>
                <input placeholder="price" type="text" data-type="currency" value={productPrice} onChange={(event) => setProductPrice(event.target.value)}/>
                <input placeholder="inventory" type="number" value={productInventory} onChange={(event) => setProductInventory(event.target.value)}/>
                <button type="submit">Submit</button>
            </form>
       {products.length ? (
         products.map(( product ) => {
          return (
            <div className="product-tile"key={product.id} onClick={() => {
              setSelectedProduct(product)
              navigate('/singleproduct')
             }}>
              <img src={product.imageUrl}/>
              <div className="product-name">
                <h3>{product.name}</h3>
                <h3>{product.price}</h3>
              </div>
                <button>Edit Product</button>
                <button  value={productId} onMouseEnter={(event) => setProductId(event.target.value)} onClick={handleDelete}>Delete Product</button>
            </div>
          )
         })
       ):(
          <h1> .... Loading Products</h1>
       )
    }
        </div>
    );

  } else{
    return (
      <div className="grid-container">
      

     {products.length ? (
       products.map(( product ) => {
        return (
          <div className="product-tile"key={product.id} onClick={() => {
            setSelectedProduct(product)
            navigate('/singleproduct')
           }}>
            <img src={product.imageUrl}/>
            <div className="product-name">
              <h3>{product.name}</h3>
              <h3>{product.price}</h3>
            </div>
          </div>
        )
       })
     ):(
        <h1> .... Loading Products</h1>
     )
  }
      </div>
  );
  }
};

export default Home;
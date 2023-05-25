import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css'
const Home = ( { products, setSelectedProduct, selectedProduct } ) => {
  const navigate = useNavigate();
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
};


export default Home;
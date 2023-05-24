import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ( { products, setSelectedProduct, selectedProduct } ) => {
  const navigate = useNavigate();
    return (
        <>
        

       {products.length ? (
         products.map(( product ) => {
          return (
            <div key={product.id} onClick={() => {
              setSelectedProduct(product)
              navigate('/singleproduct')
             }}>
               <h2>{product.name}</h2>
               <h3>{product.price}</h3>
               <em>{product.imageUrl}</em>
            </div>
          )
         })
       ):(
          <h1> .... Loading Products</h1>
       )
    }
        </>
    );
};





export default Home;
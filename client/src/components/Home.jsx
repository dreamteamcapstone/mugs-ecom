import React from "react";

const Home = ( { products } ) => {
    return (
        <>
        

       {products.length ? (
         products.map(( product ) => {
          return (
            <div key={product._id}>
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
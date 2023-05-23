const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, getProductByName, getProductById, updateProduct, destroyProduct } = require("../db");

const { requireUser } = require('./utils')

// Get All Products
router.get('/', async (req, res, next) => {
    try {
       const allProducts = await getAllProducts()

       res.send(
        allProducts
       );

    } catch (error) {
        next (error);
    }
});

// GET A Product By The ID
router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;

    const product = await getProductById(productId);
 
 try {
     
     if(!product){
        next({
            name: "Error Finding Product",
            message: "Unable to find a product by that ID"
        });
  
     } else {

         res.send (
             product
            );
     }

   } catch (error) {
      next(error)
  }

});

// GET A Product By Name //Not working as of 5/21 -GG
router.get('/:name', async (req, res, next) => {
    const { name } = req.params;

    const product = await getProductByName(name);
 
 try {
     
     if(!product){
        next({
            name: "Error Finding Product",
            message: "Unable to find a product by that name"
        });
  
     } else {

         res.send (
             product
            );
     }

   } catch (error) {
      next(error)
  }

});

//Create A New Product
router.post('/', requireUser, async (req, res, next) => {
    const { description, name, imageUrl, price, inventory } = req.body
    
    const takenProduct = await getProductByName(name);

    if (takenProduct) {
      next({
        name: "Error Creating Product",
        message: "This product name already exists"
      });
    } else {
        try {
          const newProduct = await createProduct({description, name, imageUrl, price, inventory});
          res.send(
             newProduct
         );
  } catch (error) {
    next(error)
   }
  }
});

//Getting error "column "imageUrl" of relation "products" does not exist"
//Update A Product
router.patch('/:productId', requireUser, async (req, res, next) => {
    const { description, name, imageUrl, price, inventory } = req.body
     const { productId } = req.params;
   
  try {
       const product = await getProductById(productId);
       
       if(!product) {
        next({
            name: "Error Finding Product",
            message: "Unable to find a product by that Id"
        });

        }
        
        const updatedProduct = await updateProduct(productId, 
            {description,

            name,
            imageUrl,
            price,
            inventory
            });
        res.send(updatedProduct)

     } catch (error) {
        next(error)
     }
})

//Delete A Product
router.delete('/:productId', requireUser, async (req, res, next) => {
      const { productId } = req.params;

      const product = await getProductById(productId);

     if(!product){
        next({
            name: "Error Finding Product",
            message: "Unable to find a product by that ID"
        });

     } else {

         try {
            const deletedProduct = await destroyProduct(productId);
     
            res.send (
             deletedProduct
            );

        } catch (error) {
            next(error)
        }
     }

});



module.exports = router;


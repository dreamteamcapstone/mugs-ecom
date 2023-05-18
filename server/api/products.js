const express = require('express');
const router = express.Router();
const { getAllProducts } = require("../db");


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




module.exports = router;


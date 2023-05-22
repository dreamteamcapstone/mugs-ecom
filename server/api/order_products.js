const express = require('express');
const router = express.Router();

const { 
    updateOrderProduct, 
    destroyOrderProduct
     } = require('../db');

router.patch("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const {quantity, purchasePrice} = req.body;
        const orderProduct = await updateOrderProduct({id, quantity, purchasePrice});
        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const orderProduct = await destroyOrderProduct(id);
        res.send(orderProduct);
    } catch (error) {
        next(error)
    }
});



module.exports = router;
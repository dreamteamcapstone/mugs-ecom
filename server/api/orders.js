const express = require('express');
const router = express.Router();
const {createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder, getAllOrderProductsByOrder, getAllOrdersByUser, addOrderProduct} = require("../db");
const { requireUser } = require('./utils')

// GET /api/orders
router.get('/', requireUser, async (req, res, next) => {
    try {
      const orders = await getAllOrders();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

// POST /api/orders
router.post('/', requireUser, async (req, res, next) => {
    try {
        const { userId, purchased } = req.body;
    
        const order = await createOrder({ userId, purchased });

        res.json(order);
      } catch (error) {
        next(error);
      }
  });

// PATCH /api/orders/:orderId
router.patch('/:orderId', requireUser, async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { userId, purchased } = req.body;
    
        const order = await getOrderById(orderId);
    
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
    
        const updatedOrder = await updateOrder({ id: orderId, userId, purchased });
    
        res.json(updatedOrder);
      } catch (error) {
        next(error);
      }
  });


// DELETE /api/orders/:orderId
router.delete('/:orderId', requireUser, async (req, res, next) => {
    try {
        const { orderId } = req.params;
    
        const order = await getOrderById(orderId);
    
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
    
        const deletionResult = await deleteOrder(orderId);
        res.json({ message: 'Order deleted', deletionResult });
      } catch (error) {
        next(error);
      }  
  });

// POST /api/orders/:orderId/products 

router.post('/:orderId/products', requireUser, async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { productId, quantity, purchasePrice } = req.body;
      console.log("addProduct")
        const orderProducts = await getAllOrderProductsByOrder(orderId);
        const product = orderProducts.find(orderProduct => orderProduct.productId === productId)
            if (product) {
                // const updatedQuantity = quantity + product.quantity;
                // console.log(updatedQuantity);
                // // const updatedPurchasePrice = Number(product.purchasePrice) * updatedQuantity;
                // // console.log(updatedPurchasePrice)
                // const updatedOrderItem = await updateOrderProduct({productId, updatedQuantity, purchasePrice})
                // console.log(updatedOrderItem)
                // res.send(updatedOrderItem);
                next({
                  name: "Order Product already exists in Order",
                  message: "Order Product quantity will need to be updated from cart"
                })
            } 
            if (!product) {
                const product = await addOrderProduct({
                    orderId, 
                    productId, 
                    quantity, 
                    purchasePrice
                })
                res.send(product);
            }

      } catch (error) {
        next(error);
      }
  });

//GET /api/orders/:orderId/products
  router.get('/:orderId/products', requireUser, async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const orderProducts = await getAllOrderProductsByOrder({id: orderId})
      res.send(orderProducts);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;



const express = require('express');
const router = express.Router();
const {createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder, getAllOrderProductsByOrder, addOrderProduct} = require("../db");


// GET /api/orders
router.get('/', async (req, res, next) => {
    try {
      const orders = await getAllOrders();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

// POST /api/orders
router.post('/', async (req, res, next) => {
    try {
        const { userId, purchased } = req.body;
    
        const order = await createOrder({ userId, purchased });

        res.json(order);
      } catch (error) {
        next(error);
      }
  });

// PUT /api/orders/:orderId
router.put('/:orderId', async (req, res, next) => {
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
router.delete('/:orderId', async (req, res, next) => {
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
// router.post('/:orderId/products', async (req, res, next) => {
//     try {
//         const { orderId } = req.params;
//         const { productId, quantity, purchasePrice } = req.body;
    
//         const orderProduct = await addOrderProduct({ orderId, productId, quantity, purchasePrice });
//         const orderProducts = await getAllOrderProductsByOrder(orderId);

//         res.json(orderProducts);
//       } catch (error) {
//         next(error);
//       }
//   });

//GET /api/orders/:orderId/products
  router.get('/orders/:orderId/products', async (req, res, next) => {
    try {
      const { orderId } = req.params;
  
      const orderProducts = await getAllOrderProductsByOrder(orderId);
  

      res.json(orderProducts);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;



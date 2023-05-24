const client = require('./client');
const {attachOrderProductsToOrder} = require("./order_products")

const createOrder = async ({ userId, purchased }) => {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders("userId", purchased)
            VALUES ($1, $2)
            RETURNING *;
        `, [userId, purchased]);

        return order;
        console.log(order);
    } catch (error) {
        throw error;
    }
};

const getOrdersWithoutProducts = async () => {
    try {
        const { rows } = await client.query(`
          SELECT * from orders;
        `);
        return rows;
      } catch (error) {
        throw error;
      }
}

const getOrderById = async (id) => {
    try {
        const { rows: [order] } = await client.query(`
          SELECT * FROM orders
          WHERE id = $1;
        `, [id]);
        
        return order;
      } catch (error) {
        console.error(error);
      }
}

const getAllOrdersByUser = async (id) => {
    try {
        let orders = await getAllOrders();
        orders = orders.filter(order=> {return order.userId === id});
        
        return orders;
        
    } catch (error) {
        throw error;
    }
}

const getAllOrders = async () => {
    try {
        const { rows: orders } = await client.query(
          `
          Select orders.*, users.email AS "customerEmail"
          FROM orders
          JOIN users ON orders."userId" = users.id
          `
          );
    
        return await attachOrderProductsToOrder(orders);
      } catch (error) {
        throw error;
      }
}



const updateOrder = async ({id, ...fields}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
      try {
        const { rows: [order] } = await client.query(`
          UPDATE orders
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `, Object.values(fields));
    
        return order;
      } catch (error) {
        console.error(error);
    }
}
const deleteOrder = async (id) => {
    try {
        // Delete all order_products whose order is the one being deleted
        await client.query(`
          DELETE FROM order_products
          WHERE "orderId"=$1
        `, [id]);
    
        // Remove the order from the database
        const { rows } = await client.query(`
          DELETE FROM orders
          WHERE id=$1
        `, [id]);
    
        if (rows === 0) {
          throw new Error(`Order with id ${id} not found`);
        }
    
        return { message: "Order deleted, order has been removed", rows};
      } catch (error) {
        console.error(error);
      }
}

module.exports = {
    createOrder,
    getOrdersWithoutProducts,
    getOrderById,
    updateOrder,
    deleteOrder,
    getAllOrdersByUser,
    getAllOrders
};
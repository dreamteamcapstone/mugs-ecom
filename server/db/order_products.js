const client = require('./client');

async function addOrderProduct({orderId, productId, quantity, purchasePrice}) {
    try {
        const { rows: [order_product] } =await client.query(`
            INSERT INTO order_products("orderId", "productId", quantity, purchasePrice)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ("orderId", "productId") DO NOTHING
            RETURNING *;
        `, [orderId, productId, quantity, purchasePrice])
        return order_product;
    } catch (error) {
        throw error;
    }
}

async function updateOrderProduct({id, quantity}) {
    try {
        const { rows: [order_product] } = await client.query(`
        UPDATE order_products
        SET quantity=$2
        WHERE id=$1
        RETURNING *
        `, [id, quantity]);
        return order_product;
    } catch (error) {
        throw error;
    }
}

async function destroyOrderProduct(id) {
    try {
        const {rows: [order_product]} = await client.query(`
        DELETE FROM order_products 
        WHERE id=$1
        RETURNING *
        `, [id])
        return order_product
      } catch (error) {
        throw error
      }
}

async function getAllOrderProductsByOrder(id) {
    try {
        const {rows: order_products } = await client.query(`
        SELECT *
        FROM order_products
        WHERE "orderId"=$1
        `, [id]);
        return order_products
      } catch (error) {
        throw error
      }
}

module.exports = {
    addOrderProduct,
    updateOrderProduct,
    destroyOrderProduct,
    getAllOrderProductsByOrder
};
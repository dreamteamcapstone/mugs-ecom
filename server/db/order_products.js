const client = require('./client');

const addProductToOrder = async ({orderId, productId, quantity, purchasePrice}) => {
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

module.exports = {
    addProductToOrder
};
const client = require('./client');

async function addOrderProduct({orderId, productId, quantity, purchasePrice}) {
    try {
        const { rows: [order_product] } =await client.query(`
            INSERT INTO order_products("orderId", "productId", quantity, "purchasePrice")
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ("orderId", "productId") DO NOTHING
            RETURNING *;
        `, [orderId, productId, quantity, purchasePrice])
        return order_product;
    } catch (error) {
        throw error;
    }
}

async function updateOrderProduct({id, quantity, purchasePrice}) {
    try {
        const { rows: [order_product] } = await client.query(`
        UPDATE order_products
        SET quantity=$2, "purchasePrice"=$3
        WHERE id=$1
        RETURNING *
        `, [id, quantity, purchasePrice]);
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

async function attachOrderProductsToOrder(orders) {
    const ordersToReturn = [...orders]; 

    const position = orders.map((_, index) => `$${index + 1}`).join(', ');
    const orderIds = orders.map((order) => order.id);
  
    const { rows: products } = await client.query(
      `
    SELECT products.*, order_products.quantity, order_products."purchasePrice", order_products."orderId", order_products.id AS "orderProductId"
    FROM products
    JOIN order_products ON order_products."productId" = products.id
    WHERE order_products."orderId" IN (${position});
    `,
      orderIds
    );
  
    for (const order of ordersToReturn) {
      const productsToAdd = products.filter(
        (orderProduct) => orderProduct.orderId === order.id
      );
  
      order.products = productsToAdd;
    }
  
    return ordersToReturn;
  }

module.exports = {
    addOrderProduct,
    updateOrderProduct,
    destroyOrderProduct,
    getAllOrderProductsByOrder,
    attachOrderProductsToOrder
};
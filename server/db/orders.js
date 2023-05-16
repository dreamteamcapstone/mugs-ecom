const client = require('./client');

const createOrder = async ({ userId, purchased }) => {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders("userId", purchased)
            VALUES ($1, $2)
            RETURNING *;
        `, [userId, purchased]);

        return order;
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
module.exports = {
    createOrder,
    getOrdersWithoutProducts,
};
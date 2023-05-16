const client = require('./client');

const createProduct = async ({ name, description, imageUrl, price }) => {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, imageUrl, price)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, description, imageUrl, price]);
        return product;
    } catch (error) {
        throw error;
    }
};

const getAllProducts = async () => {
    try {
        const { rows } = await client.query (`
            SELECT * FROM products;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createProduct,
    getAllProducts,
};
const client = require('./client');

const createProduct = async ({ name, description, imageUrl, price, inventory}) => {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, imageUrl, price, inventory)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, description, imageUrl, price, inventory]);
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

const getProductById = async (id) => {
 try {
    const { rows: [ product ] } = await client.query(`
      SELECT * FROM products
      WHERE id = ${ id }
    `)

    return product;
 } catch (error) {
    throw error;
 }
}

const getProductByName = async (name) => {
  try {
    const { rows: [ product ] } = await client.query(`
      SELECT * FROM products
      WHERE name=$1
    `, [name])

    return product;
  } catch (error) {
    throw error;
  }
}

const updateProduct = async ({id, ...fields}) => {
 try {
    const keys = Object.keys(fields);

    const setString = keys.map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');


         const { rows: [ product ] } = await client.query(`
          UPDATE products
          SET ${ setString }
          WHERE id=${id}
          RETURNING *;
         `, Object.values(fields)
         );

      return product;
 } catch (error) {
    throw error;
 }
};

const destroyProduct = async (id) => {
    try {
        const { rows: [product] } = await client.query(`
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
        `, [id]);
  
      return product;
    } catch (error) {
        throw error;
    }
  }

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    destroyProduct,
    getProductByName
};
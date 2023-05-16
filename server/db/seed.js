const client = require('./client');

const dropTables = async () => {
  try {
    console.log('Starting to drop all tables...');
    await client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);
    console.log('Finished droppping all tables successfully!');
  } catch (error) {
    console.error('Error dropping tables');
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log('Starting to create all tables...');
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255) UNIQUE NOT NULL,
      phoneNumber VARCHAR(15) UNIQUE NOT NULL
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      description TEXT NOT NULL,
      name VARCHAR(255) UNIQUE NOT NULL,
      price MONEY NOT NULL
    );
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      purchased BOOLEAN DEFAULT false
    );
    Create TABLE order_products(
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      purchasePrice Money NOT NULL,
      UNIQUE ("orderId", "productId")
    );
    `);
    console.log(
      'Finished creating all tables successfully! Now, to add some data!'
    );
  } catch (error) {
    console.error('Error creating tables');
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log('Adding initial users to "Users" table...');
  try {
    const usersToCreate = [
      {email: "hello@gmail.com", password: "123456", address: "123 East Main Street", phoneNumber: "4351234567"}
      {email: "gmail@gmail.com", password: "password", address: "234 Point Place", phoneNumber: "810-636-1728"}
      {email: "foo@yahoo.com", password: "ldfja;ass", address: "1024 Washington Ave", phoneNumber: "3856744444"}
    ]
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log(users);
    
    console.log('Finished adding users!');
  } catch (error) {
    
  }
};

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();

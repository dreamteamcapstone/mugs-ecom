const {
  createUser,
  createProduct,
  createOrder,
  getOrdersWithoutProducts,
  getAllProducts,
  addOrderProduct,
  getOrderById,
  getAllOrdersByUser,
  getAllOrders,
  getAllOrderProductsByOrder,
  getUser
} = require('./')
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
    console.log('Finished dropping all tables successfully!');
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
      address VARCHAR(255) UNIQUE,
      "phoneNumber" VARCHAR(15) UNIQUE,
      admin BOOLEAN DEFAULT false
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      description TEXT NOT NULL,
      name VARCHAR(255) UNIQUE NOT NULL,
      "imageUrl" TEXT NOT NULL,
      price MONEY NOT NULL,
      inventory INTEGER NOT NULL
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
      "purchasePrice" Money NOT NULL,
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
      {email: "hello@gmail.com", password: "123456", address: "123 East Main Street", phoneNumber: "4351234567", admin: false},
      {email: "gmail@gmail.com", password: "password", address: "234 Point Place", phoneNumber: "810-636-1728", admin: false}, 
      {email: "admin@yahoo.com", password: "admin", address: "1024 Washington Ave", phoneNumber: "3856744444", admin: true},
    ]
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log(users);
    
    console.log('Finished adding users!');
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
};

const createInitialProducts = async () => {
  try {
    console.log("Starting to create Products")

    const productsToCreate = [
      {name: "React Mug", description: "UseEffect(Caffeine)!!", imageUrl: "https://cdn.shopify.com/s/files/1/0528/4148/0360/products/white-ceramic-mug-with-color-inside-blue-11oz-right-602ed35606e69.jpg?v=1613681500&width=713", price: 10.00, inventory: 20},
      {name: "Floral Mug", description: "Floral Design with Golden Accent Handle #BOUJEE" , imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFLOxqspaPRlUQVLIzWDH74Qz0KNIKq9X7ZA&usqp=CAU", price: 15.00, inventory: 20},
      {name: "Debug Mug", description: "Step-by-step guide to debugging", imageUrl: "https://m.media-amazon.com/images/I/71kh9zvQZ-L._AC_SX569_.jpg" , price: 10.00, inventory: 20 },
      {name: "Marauders Map Mug", description: "Color changes Marauders Map when Hot liquid is added!", imageUrl: "https://ae01.alicdn.com/kf/HTB1TrH4MXXXXXczXpXXq6xXFXXXY/color-changing-Light-Magic-mugs-Marauders-Map-mug-Mischief-Managed-mug-Platform-9-and-3-4.jpg", price: 15.00, inventory: 20},
      {name: "Recycle Mug", description: "Sip from a recycling can...mmm", imageUrl: "https://m.media-amazon.com/images/I/81leExBx1rL.__AC_SX300_SY300_QL70_FMwebp_.jpg", price: 14.00, inventory: 20},
      {name: "Chic Mug", description: "A cute baby chicken!" , imageUrl: "https://m.media-amazon.com/images/I/31zOVVHJClL.jpg", price: 12.50, inventory: 20},
    ]

    const products = await Promise.all(productsToCreate.map(createProduct))
    console.log("products created:")
    console.log(products)

    console.log("Finished creating products!")

  } catch (error) {
    console.error("Error creating products!")
    throw error
  }

};

const createInitialOrders = async () => {
  console.log("starting to create orders...")

   const ordersToCreate = [
    {
      userId: 2,
      purchased: false,
    },
    {
      userId: 2,
      purchased: true,
    },
    {
      userId: 2,
      purchased: true,
    },
    {
      userId: 1,
      purchased: false,
    },
    {
      userId: 3,
      purchased: true,
    },
  ]
  const orders = await Promise.all(
    ordersToCreate.map((order) => createOrder(order))
  )
    console.log("Orders Created: ", orders);
    console.log("Finished creating orders.")
};

const createInitialOrderProducts = async () => {
  console.log('Starting to create order_products...')
  const [order1, order2, order3, order4, order5] = 
  await getOrdersWithoutProducts();
  const [reactMug, floralMug, debugMug, maraudersMug, recycleMug, chicMug] = 
  await getAllProducts();

  const orderProductsToCreate = [
    {
      orderId: order1.id,
      productId: reactMug.id,
      quantity: 1,
      purchasePrice: reactMug.price,
    },
    {
      orderId: order1.id,
      productId: floralMug.id,
      quantity: 1,
      purchasePrice: floralMug.price,
    },
    {
      orderId: order2.id,
      productId: chicMug.id,
      quantity: 2,
      purchasePrice: chicMug.price,
    },
    {
      orderId: order4.id,
      productId: maraudersMug.id,
      quantity: 1,
      purchasePrice: maraudersMug.price,
    },
    {
      orderId: order5.id,
      productId: debugMug.id,
      quantity: 2,
      purchasePrice: debugMug.price,
    },
    {
      orderId: order5.id,
      productId: recycleMug.id,
      quantity: 2,
      purchasePrice: recycleMug.price,
    },
  ]
  const orderProducts = await Promise.all(
    orderProductsToCreate.map(addOrderProduct))
    console.log("Order_products created:", orderProducts)
    console.log("Finished adding/creating order_products")
}
const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialOrderProducts();
    console.log("this is checking getAllOrders---->", await getAllOrders())
    console.log("this is checking getAllOrderByUser---->", await getAllOrdersByUser('hello@gmail.com'))
    console.log('getUser ---->', await getUser({email: "hello@gmail.com", password: "123456"}))
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();

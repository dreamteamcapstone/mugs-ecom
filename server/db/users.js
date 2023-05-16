const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashedPassword({password}) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}
async function checkPassword(password, hash) {
  const compare = await bcrypt.compare(password, hash)
  return compare;
}
async function createUser({email, password, address, phoneNumber}) {
  try {
    const newPassword = await hashedPassword({password});

    const { rows: [user] } = await client.query(`
      INSERT INTO users(email, password, address, phoneNumber)
      VALUES ($1, $2, $3, $4) 
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, address, phoneNumber;
    `, [email, newPassword, address, phoneNumber])
    return user;
  } catch (error) {
    console.error("error in createUser", error)
    throw error;
  }
}

async function getUser() {}

async function getUserById() {}

async function getUserByUsername() {}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};

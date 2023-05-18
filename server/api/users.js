const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { createUser, getUser, getUserByEmail, getAllOrdersByUser, } = require('../db')
const { requireUser } = require('./utils');
// GET: api/users
router.get('/', async (req, res, next) => {
  try {
    res.send('Hit the users api!');
  } catch (error) {
    throw error;
  }
});


router.post('/login', async (req, res, next) => {
  const { email, password} = req.body;

  if (!email || !password) {
    //start here
  }
});

router.post('/register', async (req, res, next) => {
});

router.get('/me', async (req, res, next) => {
});

module.exports = router;

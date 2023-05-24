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
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "Missing Credentials",
      message: "email and/or password are needed."
    })
  }
  try {
    const user = await getUser({email, password});
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '2w' });

    res.send({ message: "Logged In!", token: token, user: user})
  } catch(error){
    next(error);
  }
});


router.post('/register', async (req, res, next) => {
  try {
    const {email, password, firstName, lastName, address, phoneNumber, admin} = req.body;

    if(password.length < 8) {
      next({
        name: "Password Too Short",
        message: "password must be at least 8 Characters long"
      })
    }
    //password must be longer than 4 characters, at least 5.
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                message: "Registration Error",
                error: "User already exists!",
        });
        } else {

        const user = await createUser({email, password, firstName, lastName, address, phoneNumber, admin});

        const token = jwt.sign({id: user.id, email}, 
            process.env.JWT_SECRET, { expiresIn: '1w' });

        res.send({
            message: "User has been registered & Logged In",
            token: token,
            user: user
        });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/orders', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    if(req.user && req.user.id === id) {
      const allUserOrders = await getAllOrdersByUser(id);
      res.send(allUserOrders.filter((userOrder) => userOrder.purchased === true));
    } 
  } catch (error) {
    next(error);
  }
})
module.exports = router;
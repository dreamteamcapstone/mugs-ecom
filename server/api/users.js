const express = require('express');
const router = express.Router();

// GET: api/users
router.get('/', async (req, res, next) => {
  try {
    res.send('Hit the users api!');
  } catch (error) {
    throw error;
  }
});

router.post('/login', async (req, res, next) => {
});

router.post('/register', async (req, res, next) => {
});

router.get('/me', async (req, res, next) => {
});

module.exports = router;

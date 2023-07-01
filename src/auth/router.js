const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic'); // Import the basic authentication middleware
const bcrypt = require('bcrypt');
const users = require('./models/user-model');

// POST /signup
router.post('/signup', async (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await users.create({
      username,
      password: hashedPassword
    });
    res.status(201).json(newUser);
});

// POST /signin
router.post('/signin', basicAuth, (req, res) => {
    res.status(200).json(req.user)
});

module.exports = router;

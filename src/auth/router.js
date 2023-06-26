'use strict';

const express = require('express');
const { basicAuth } = require('../auth/middleware/basic');
const { usersModel } = require('./models/user-model');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await usersModel.create({ username, password });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/signin', basicAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = { authRoutes: router };

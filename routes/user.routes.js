const express = require('express');
const router = express.Router();

const users = require('../controllers/user.controller');

router.get('/login',  users.login);
router.post('/register', users.registerUser);

module.exports = router;
const express = require('express');
const router = express.Router();

const users = require('../controllers/user.controller');

router.get('/users',  users.getAll);
router.post('/users', users.addUser);

module.exports = router;
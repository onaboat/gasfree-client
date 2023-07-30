const express = require('express')
const router = express.Router()
const User = require('../model/user-model')
const { getAllUsers, addUser } = require('../controller/user-controller')

// Get all users
router.get('/', getAllUsers);
router.post('/', addUser);


module.exports = router;
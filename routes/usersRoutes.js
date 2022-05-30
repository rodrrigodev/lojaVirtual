const express = require('express')

const userRouter = express.Router()

const usersController = require('../controllers/usersController')

userRouter.get('/', usersController.createUser)

userRouter.post('/', usersController.login)

module.exports = userRouter
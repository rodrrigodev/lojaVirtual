const express = require('express')

const router = express.Router()

const productsController = require('../controllers/productsControllers')

router.get('/', productsController.index)

router.get('/detail/:id', productsController.details)





module.exports = router
const express = require('express')

const router = express.Router()

const productsController = require('../controllers/productsControllers')

router.get('/', productsController.index)

router.get('/detail/:id', productsController.details)

router.delete('/delete/:id', productsController.delete)

router.get('/edit/:id', productsController.edit)

router.put('/edit/:id', productsController.update)





module.exports = router
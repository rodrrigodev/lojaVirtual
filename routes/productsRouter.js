const express = require('express')

const router = express.Router()

const productsController = require('../controllers/productsControllers')

const multerConfig = require('../src/utils/multer')

router.get('/', productsController.index)

router.get('/detail/:id', productsController.details)

router.delete('/delete/:id', productsController.delete)

router.get('/edit/:id', productsController.edit)

router.put('/edit/:id', productsController.update)

router.get('/create', productsController.create)

router.post('/', multerConfig.single('image'), productsController.save) // localhost:3000/products/





module.exports = router
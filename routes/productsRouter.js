const express = require('express')

const router = express.Router()

const productsController = require('../controllers/productsControllers')

const multerConfig = require('../src/utils/multer')

const auth = require('../middlewares/auth')


router.get('/', auth, productsController.index)

router.get('/detail/:id', auth, productsController.details)

router.delete('/delete/:id', auth, productsController.delete)

router.get('/edit/:id', auth, productsController.edit)

router.put('/edit/:id', multerConfig.single('image'), auth, productsController.update)

router.get('/create', auth, productsController.create)

router.post('/', multerConfig.single('image'), auth, productsController.save) // localhost:3000/products/





module.exports = router
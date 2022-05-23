const multer = require('multer')

const path = require('path')

const multerStrorage = multer.diskStorage({
    destination: (req, file, callback)=>{
       const folderpath = path.join(__dirname, '..', '..', 'public', 'images', 'products')
        callback(null, folderpath)
    },
    filename: (req, file, callback)=>{
        const extensionImage = path.extname(file.originalname)
        const productImageName = Date.now() + extensionImage
        callback(null, productImageName)
    }
})

const fileUpload = multer({storage: multerStrorage})

module.exports = fileUpload
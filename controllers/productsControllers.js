const getInfoDatabase = require('../src/utils/getInfoDatabase')
const products = getInfoDatabase('products')
const formatPrice = require('../src/utils/formatPrice')
const productsController = {
    index: (req, res)=>{
        res.render('products', {products, formatPrice})
    },
    details: (req, res)=>{
        const {id} = req.params
        const productFound = products.find((product=>{
           return product.id === Number(id)  
        }))
        res.render('detail', {productFound, formatPrice})
    }
}


module.exports = productsController
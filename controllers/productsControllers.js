const fs = require('fs')
const path = require('path')
const getInfoDatabase = require('../src/utils/getInfoDatabase')
const products = getInfoDatabase('products')
const formatPrice = require('../src/utils/formatPrice')
const pathFile = path.join(__dirname, '..', 'src', 'database', 'products.json')
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
    },

    edit: (req, res)=>{
        const {id} = req.params
        const productFound = products.find((product)=>{
            return product.id === Number(id)
        })
        res.render('product-edit-form', {productFound})
    },

    update: (req, res)=>{
        const {id} = req.params
        const {name, description, price, discount, category} =  req.body
        const productEdit = products.find((product=>{
            return product.id === Number(id)  
         }))
         const productEdited = {
             id: productEdit.id,
             name: name,
             description: description,
             price: price,
             discount: discount,
             category: category,
             Image: productEdit.image
         }
         const newProducts = products.map((product)=>{
            if(product.id === productEdit.id){
                return {...productEdited}
            }
            return product
         })
        const productJSON = JSON.stringify(newProducts, null, ' ')
        fs.writeFileSync(pathFile, productJSON)

        res.redirect('/products')
         
    },
    delete: (req, res)=>{
        const {id} = req.params
        const productFiltered = products.filter(product => product.id !== Number(id))
        const productJSON = JSON.stringify(productFiltered, null, ' ')
        const pathFile = path.join(__dirname, '..', 'src', 'database', 'products.json')
        fs.writeFileSync(pathFile, productJSON)
        res.redirect('/products')
    }
}


module.exports = productsController
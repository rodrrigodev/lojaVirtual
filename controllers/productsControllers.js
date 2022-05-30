const fs = require('fs')
const path = require('path')
const getInfoDatabase = require('../src/utils/getInfoDatabase')
const products = getInfoDatabase('products')
const formatPrice = require('../src/utils/formatPrice')
const { json } = require('express/lib/response')
const pathFile = path.join(__dirname, '..', 'src', 'database', 'products.json')
const SIZE_IMAGE_LIMIT_BYTE = 20000
const productsController = {
    index: (req, res)=>{
        const userSession = req.session.user
        res.render('products', {products, formatPrice, userSession})
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
        const {name, description, price, discount, category, image} =  req.body
        const productEdit = products.find((product=>{
            return product.id === Number(id)  
         }))

         const filenameOriginal = productEdit.image
         const imageName = req.file.filename == false?filenameOriginal:filename

         if(imageName !== jpg && imageName !== png){
             return res.send('Entensão de imagem não permitida! volte e selecione outra imagem.')
         }
         if(imageName > SIZE_IMAGE_LIMIT_BYTE){
             return res.send('Tamanho de imagem não permitido!')
         }
         const productEdited = {
             id: productEdit.id,
             name: name,
             description: description,
             price: price,
             discount: discount,
             category: category,
             image: imageName
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
    },
        create: (req, res)=>{
            res.render('product-create-form')
        },
        save: (req, res)=>{
            const {name, price, discount, category, description} = req.body
            const newId = products.length + 2
            console.log(req.file)

            if(!req.file){
               return res.send('Voce deve selecionar uma imagem!')
            }

            const {filename, size} = req.file
        
            if(size < SIZE_IMAGE_LIMIT_BYTE){
              return  res.send("Tamanho de image não permitido!")
            }

            const extensionImage = filename.split('.')[1]

            if(extensionImage !== 'png' && extensionImage !== 'jpg'){
                return res.send('Extensão de imagem não permitido!')
            }

            const newProduct = {
                id : newId,
                name,
                price,
                discount,
                category,
                description,
                image: filename
            }
            
            products.push(newProduct)

            const newProductJson = JSON.stringify(products, null, ' ')
            fs.writeFileSync(pathFile, newProductJson)
            res.redirect('/products')
        }

}


module.exports = productsController
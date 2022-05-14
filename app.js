const express = require('express')
const { use } = require('express/lib/router')
const port = 3000
const methodOverride = require('method-override')

const app = express()
const path = require('path')
const getInfoDatabase = require('./src/utils/getInfoDatabase')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'src', 'views'))
app.use(express.urlencoded({extended:false}))

app.use(express.json())
app.use(methodOverride('_method'))

app.get('/', (req, res)=>{
    res.render('login')
})

app.post('/', (req, res)=>{
    const users = getInfoDatabase('users')
    const {email, password} = req.body
    const userExist = users.find(user =>{ return user.email === email && user.password === password })
    if(userExist){
       return res.redirect('/products')
    }else{
       return res.redirect('/')
    }
})





app.listen(port, ()=>console.log(`Servidor rodando na porta ${port}`))
const express = require('express')
const port = 3000
const methodOverride = require('method-override')

const app = express()
const path = require('path')

const productsRouter = require('./routes/productsRouter')

const userRouter = require('./routes/usersRoutes')

const session = require('express-session')

const log = require('./middlewares/log')
const authMiddleware = require('./middlewares/auth')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'src', 'views'))
app.use(express.urlencoded({extended:false}))

app.use(express.json())
app.use(methodOverride('_method'))

app.use(session({secret:'secret message'}))

app.use(log)

app.use('/products', productsRouter)

app.use('/', userRouter)




app.listen(port, ()=>console.log(`Servidor rodando na porta ${port}`))
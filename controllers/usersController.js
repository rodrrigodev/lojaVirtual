const getInfoDatabase = require('../src/utils/getInfoDatabase')
const users = getInfoDatabase('users')
const usersController = {
    createUser: (req, res)=>{
        res.render('login')
    },
    login: (req, res)=>{
        const {email, password} = req.body
        const userExist = users.find(user =>{ return user.email === email && user.password === password })
        if(!userExist){
            return res.send('Usuário ou senha incorreto ou não existente no banco de dados!')
        }
            req.session.user = userExist
            return res.redirect('/products')
        }
}


module.exports = usersController
function auth(req, res, next){
        const userIsLogged = req.session.user
        if(!userIsLogged){
           return res.send('Você não esta logado no sistema')
        }else{
        return next()
    }}

    module.exports = auth
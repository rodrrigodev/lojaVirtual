function auth(req, res, next){
        const userIsLogged = Boolean(req.session.user) || Boolean(req.user)
        if(!userIsLogged){
           return res.send('Você não esta logado no sistema')
        }else{
        return next()
    }}

    module.exports = auth
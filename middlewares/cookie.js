const getInfoDatabase = require('../src/utils/getInfoDatabase')

const users = getInfoDatabase('users')

function cookie(req, res, next){
    const cookies = Boolean(req.cookies.remember)
    let userIsLoggedBySession = Boolean(req.session.userIsLoggedBySession)
    
    if(cookies || userIsLoggedBySession){
        const userFound = users.find(user => user.email === cookies)
        userIsLoggedBySession = userFound
        req.user = userIsLoggedBySession
    }
    return next()
}

module.exports = cookie
const jwt = require('jsonwebtoken')
class Jwt {
    static Sign(obj){
        const token = jwt.sign(obj, process.env.secret_token)
        return token
    }
    static Verify(token){
        return jwt.verify(token, process.env.secret_token)
    }
}
module.exports = Jwt
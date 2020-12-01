const Jwt = require('../helper/jwt')
const Bcrypt = require('../helper/bcrypt')
const {User} = require('../models/index')
class UserController{
    static login(req, res, next){
        
    }
    static register(req, res, next){
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const obj = {
            name,
            email,
            password
        }
        User.create(obj).then(value => {
            res.status(200).json({name: value.name, email: value.email})
        })
        .catch(error => {
            res.status(500).json(value)
        })
    }
}
module.exports = UserController
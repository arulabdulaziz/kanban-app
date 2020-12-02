const Jwt = require('../helper/jwt')
const Bcrypt = require('../helper/bcrypt')
const {User, Task} = require('../models/index')
class UserController{
    static login(req, res, next){
        const email = req.body.email
        const password = req.body.password
        console.log(email);
        User.findOne({where:{
            email: email
        }})
        .then(value => {
            if (!value) {
                throw {
                    status: 401,
                    message: `invalid account`
                }
            }else if(Bcrypt.compare(password, value.password)){
                const token = Jwt.Sign({name: value.name, email: value.email})
                res.status(200).json(token)
            }else{
                throw {
                    status: 401,
                    message: `email or password invalid`
                }
            }
        })
        .catch(error => {
           next(error)
        })
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
            next(error)
        })
    }
}
module.exports = UserController
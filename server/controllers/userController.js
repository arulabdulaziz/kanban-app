const Jwt = require('../helper/jwt')
const Bcrypt = require('../helper/bcrypt')
const {User, Task} = require('../models/index')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.googleClient);
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
                const token = Jwt.Sign({name: value.name, email: value.email, id: value.id})
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
    static async googleLogin(req, res, next){
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.googleClient, 
            });
            const payload = ticket.getPayload()
            const findUser = await User.findOne({
                where: {
                    email : payload.email
                }
            }) 
            if (findUser) {
                const token = Jwt.Sign({id: findUser.id, email:findUser.email, name: findUser.name})
                res.status(200).json(token)
            }else{
                const createUser = await User.create({
                    name: payload.email.split('@')[0],
                    email : payload.email,
                    password: process.env.secretPassword
                })
                const token = Jwt.Sign({id: createUser.id, email:createUser.email, name: createUser.name})
                res.status(200).json(token)
            }
        } catch (error) {
            next(error)
        }
    }
}
module.exports = UserController
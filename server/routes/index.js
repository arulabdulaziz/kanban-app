const routes = require('express').Router()
const router = require('./userRoute')
const userRoutes = require('./userRoute') 

routes.get('/', (req, res) => {
    res.send(`heloo`)
})
routes.use('/user', userRoutes)
module.exports = routes
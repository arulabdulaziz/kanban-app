const routes = require('express').Router()
const router = require('./userRoute')
const userRoutes = require('./userRoute') 
const taskRoutes = require('./taskRoute')
routes.get('/', (req, res) => {
    res.send(`heloo`)
})
routes.use('/user', userRoutes)
routes.use('/tasks', taskRoutes)
module.exports = routes
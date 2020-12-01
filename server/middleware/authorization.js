const {Task} = require('../models/index')
module.exports = async (req, res, next) => {
    const id = req.params.id
    try {
        const task = await Task.findOne({where: {
            id
        }})
        if (task.UserId == req.loginUser.id) {
            next()
        }else{
            throw {
                status: 401,
                message: `You not authorization`
            }
        }
    } catch (error) {
        next(error)
    }
}
const {Task} = require('../models/index')
module.exports = async (req, res, next) => {
    const id = +req.params.id
    console.log(`masukk`);
    try {
        const task = await Task.findOne({where: {
            id: id
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
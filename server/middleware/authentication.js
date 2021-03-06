const Jwt = require('../helper/jwt')
module.exports = async (req, res, next) => {
    const token = req.headers.access_token
    if (!token) {
        res.status(400).json(`you must login first`)
    }else{
        try {
            const decoded = await Jwt.Verify(token, process.env.secret)
            if (!decoded) {
                throw {
                    status: 400,
                    message: `Your Session Is Time Up`
                }
            }else{
                req.loginUser = decoded
                next()
            }
        } catch (error) {
            next(error)
        }
    }
}
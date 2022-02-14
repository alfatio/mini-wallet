
const { decodeToken } = require('../helpers/token')


function checkToken (req,res,next){
    try {

        const token = req.headers.authorization.split(" ")[1]
        const decoded = decodeToken(token)
        req.wallet_id = decoded.id
        next()

    } catch (err) {

        res.status(500).json({
            "status" : "error",
            "message" : "authorization error"
        })
    }

}

module.exports = checkToken
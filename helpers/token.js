
const jwt = require('jsonwebtoken')

// secret need to be on env
const secret = 'secret_token'

function generateToken(payload){

    return jwt.sign(payload, secret)
}

function decodeToken(token){

    return jwt.verify(token, secret)
}

module.exports = {
    generateToken,
    decodeToken
}

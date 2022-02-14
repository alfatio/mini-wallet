
const router = require('express').Router()
const v1 = require('./v1/wallet')

router.use('/v1', v1)

module.exports = router
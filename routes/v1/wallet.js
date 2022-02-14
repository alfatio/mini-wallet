
const router = require('express').Router()
const walletController = require('../../controllers/walletController')
const checkToken = require('../../middlewares/checkToken')


router.post("/init", walletController.init)

router.use(checkToken)

router.get("/wallet", walletController.get)

router.post("/wallet", walletController.enable)
router.post("/wallet/deposits", walletController.add)
router.post("/wallet/withdrawals", walletController.use)


router.patch("/wallet", walletController.disable)

module.exports = router
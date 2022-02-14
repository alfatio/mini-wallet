
const wallet = require('../../models/wallet')
const { generateToken } = require('../../helpers/token')

async function initWallet(req,res){

    try {

        let customer_xid = req.body.customer_xid

        const cust_wallet = await wallet.initWallet(customer_xid)

        const token = generateToken({
            id: cust_wallet.rows[0].id
        })

        res.status(200).json({
            status: "success",
            data: {
                token
            }
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "status" : "error",
            "message" : err.message || "internal server error"
        })
    }
}

module.exports = initWallet
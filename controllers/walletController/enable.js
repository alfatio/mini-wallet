const wallet = require('../../models/wallet')

async function enableWallet(req,res){

    try {

        const id = req.wallet_id
        const data = await wallet.enableWallet(id)

        if(data.rowCount === 0){
            res.status(400).json({
                status : "fail",
                data: {
                    message: "wallet already enabled"
                }
            })
        }else{
            res.status(201).json({
                status: "success",
                data: {
                    wallet: data.rows[0]
                }
            })
        }

        
    } catch (err) {
        res.status(500).json({
            "status" : "error",
            "message" : err.message || "internal server error"
        })
    }
}

module.exports = enableWallet
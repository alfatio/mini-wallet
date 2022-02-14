const wallet = require('../../models/wallet')

async function disableWallet(req,res){

    try {

        const id = req.wallet_id
        const {
            is_disabled
        } = req.body

        if(!is_disabled){
            res.status(200).json({
                status: "success",
                data:{
                    message: "nothing happened"
                }
            })
        }else{
            const data = await wallet.disableWallet(id)

            res.status(200).json({
                status: "success",
                data: data.rows[0]
            })
        }
        
    } catch (err) {
        res.status(500).json({
            "status" : "error",
            "message" : err.message || "internal server error"
        })
    }
}

module.exports = disableWallet
const wallet = require('../../models/wallet')

async function getWallet(req,res){

    try {

        const id = req.wallet_id
        const data = await wallet.getWallet(id)

        if(data.rowCount === 0){
            res.status(404).json({
                status : "fail",
                data: {
                    message: "wallet not found"
                }
            })

        }else if(data.rows[0].status === "disabled"){
            res.status(400).json({
                status: "fail",
                data:{
                    message: "wallet is not enabled"
                }
            })
        }else{
            res.status(200).json({
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

module.exports = getWallet
const wallet = require('../../models/wallet')

async function useWallet(req,res){

    try {

        const id = req.wallet_id
        const {
            amount, reference_id
        } = req.body
        const wallet_data = await wallet.getWallet(id)

        if(wallet_data.rowCount === 0){
            res.status(404).json({
                status : "fail",
                data: {
                    message: "wallet not found"
                }
            })

        }else if(wallet_data.rows[0].status === "disabled"){
            res.status(400).json({
                status: "fail",
                data:{
                    message: "wallet is not enabled"
                }
            })
        }else{
            const deposit_data = await wallet.useWallet({
                id,amount,reference_id
            })
    
            
    
            res.status(200).json({
                status: "success",
                data: deposit_data.rows[0]
            })

        }
        
    } catch (err) {
        res.status(500).json({
            "status" : "error",
            "message" : err.message || "internal server error"
        })
    }
}

module.exports = useWallet
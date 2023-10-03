const JWT = require('jsonwebtoken')
require('dotenv').config();
module.exports = async (req, res , next) =>{
    const token = req.headers['authorization'].split(" ")[1]
    try{JWT.verify(token , process.env.JWT_SECRET , (err , decode)=>{
        if(err){
            return res.status(200).send({
                message:'Authorization Failed Bro',
                success:false
            })}else{
                req.body.userId = decode.id
                next();
            }
    })  }catch(error){
        console.log(error)
        res.status(401).send({
            message:'Auth Failed',
            success:false
        })
    }
}
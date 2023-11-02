// const JWT = require('jsonwebtoken')
// require('dotenv').config();
// module.exports = async (req, res , next) =>{
//     try{
//         const token = req.headers['authorization'].split(" ")[1]
//     JWT.verify(token , process.env.JWT_SECRET , (err , decode)=>{
//         if(err){
//             return res.status(200).send({
//                 message:'Authorization Failed Bro',
//                 success:false
//             })}else{
//                 req.body.userId = decode.id
//                 next();
//             }
//     })  }catch(error){
//         console.log(error)
//         res.status(401).send({
//             message:'Auth Failed',
//             success:false
//         })
//     }
// }


const JWT = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Unauthorized - Token not provided',
                success: false
            });
        }

        const token = authHeader.split(' ')[1];

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    message: 'Authorization Failed',
                    success: false
                });
            } else {
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

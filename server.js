const express =  require('express')
const morgan = require('morgan')
require('dotenv').config();
const colors  = require('colors')
const connectDB= require('./config/db')

connectDB();
const app = express();
app.use(express.json())
app.use(morgan("dev"))

// app.get("/", (req,res)=>{
//     res.status(200).send({
//         message:"server running",
//     });
// })

app.use('/api/v1' , require("./routes/userRoutes")) ;
app.use('/api/v1/admin' , require("./routes/adminRoutes")) ;


const port =process.env.PORT || 8080

app.listen(port , ()=>{
    try{ 

        console.log(`Server Running on port ${port} and on ${process.env.NODE_MODE} MODE`.blue)
    }catch(error){
        console.log(error)
        
    }
})
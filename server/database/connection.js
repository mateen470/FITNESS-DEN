import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY!!")
}).catch((error)=>{
    console.log("FAILED TO CONNECT TO DATABASE",error)
})
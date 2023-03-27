
const mongoose=require('mongoose')
require('dotenv').config()


const connection=async ()=>{
    try {
        await mongoose.connect(process.env.mongourl)
        console.log('server connected to por')
    } catch (error) {
        console.log({"error":"error while connnecting to db", error})

    }
}


module.exports={connection}
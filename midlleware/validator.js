const jwt = require("jsonwebtoken");
const { registerModel } = require("../models/registerModel");
require('dotenv').config()

const tokenValidator = (req, res, next) => {
  const userPassedToken = req.headers.authorization;

  if (!userPassedToken) {
    res.status(401).send({ error: "please login again" });
  } else {
   jwt.verify(userPassedToken,process.env.key,(err,decode)=>{
        if(err){
            res.status(401).send({'error':"please login again",err})
        }
       else if(decode){
        console.log(decode._id);
      req.body.userID=decode._id
      req.user=decode._id;
        next()
       }
       else{
        res.status(401).send({"error":"please login again"})
       }
    });
  }
};



//for admin validator;


const isAdmin=async(req,res,next)=>{
  try {
    
    const _id=req.user;
    // console.log(_id,"the id")
    const isUserAdmin=await registerModel.findOne({_id})
   //  console.log(isUserAdmin,"isadmin")

   if(isUserAdmin.role===1){
    next()
   }
   else{
    res.status(300).send({"error":"unauthorized access"})
   }
     
    
  } catch (error) {
    console.log(error)
    res.status({"error":"cannot distinguish between user",error})
  }
}

module.exports={
    tokenValidator,isAdmin
}

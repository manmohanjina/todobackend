
const { registerModel } = require("../models/registerModel");
const bcrypt=require('bcrypt')

const registerRouterController = async (req, res) => {
  try {
    const { name, email, password, security,role } = req.body;
    const userAlredyPresent=await registerModel.findOne({email})
    if(userAlredyPresent){
        return res.status(201).send({"error":"user already exist please login again"})
    }

    bcrypt.hash(password,+process.env.saltround,async(err,hashed_pass)=>{
        if(err){
            res.status(401).send({"error":"error while hashing the password"})
        }
        const new_user_register = await registerModel({
            name,
            email,
            password:hashed_pass,
            security,
            role
          }).save();
          res.status(201).send({"succ":"user successfully added"})
    })
    
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "cannot add new user", error });
  }
};

module.exports = {
  registerRouterController,
};

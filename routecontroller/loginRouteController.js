const express = require("express");
const jwt = require("jsonwebtoken");
const { registerModel } = require("../models/registerModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
require("dotenv").config();


const loginControllerRoute = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(301).send({ error: "invalid input fields" });
  }

  try {
    //checking if user email address is stored in DB or not
    const isUserPresent = await registerModel.findOne({ email });
    if (!isUserPresent) {
      res.status(401).send({ error: "no user found with email" });
    } else {
      bcrypt.compare(password, isUserPresent.password, (err, result) => {
        if (err) {
          res.status(401).send({ error: "invalid credential" });
        } else if (result) {
          //genrating a access token is all the things are matched ;
          
          fs.writeFile("./key.txt",isUserPresent._id.valueOf(),(err,text)=>{
            if(err){
              console.log(err)
            }
            else{
              console.log(text,'text created')
            }
          })
          const access_token = jwt.sign(
            { _id: isUserPresent._id },
            process.env.key,
            { expiresIn: "7d" }
          );
          res.status(200).send({ success_token: access_token });
        } else {
          res.status(301).send({ error: "wrong password try again" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "error while login", error });
  }
};

module.exports = {
  loginControllerRoute,
};

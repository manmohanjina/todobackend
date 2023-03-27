
const express=require('express');
const { UserForgotPassword } = require('../routecontroller/forgotRouterController');

const forgotRouter=express.Router();


forgotRouter.patch('/forgotpassword',UserForgotPassword)


module.exports={
    forgotRouter
}
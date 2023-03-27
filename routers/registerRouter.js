
const express=require('express')
const { registerRouterController } = require('../routecontroller/registerRouterController')

 const registerRouter=express.Router()


 registerRouter.post('/register',registerRouterController)

 module.exports={
    registerRouter
 }

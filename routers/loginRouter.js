


const express=require('express')

const { loginControllerRoute } = require('../routecontroller/loginRouteController');

const loginRoute=express.Router();


loginRoute.use('/login',loginControllerRoute)

module.exports={
    loginRoute
}
 


const express=require('express');
const { isAdmin, tokenValidator } = require('../midlleware/validator');
const { adminRouterController, adminRouterUpdater, adminDelRouterController } = require('../routecontroller/adminRouterController');
const adminRouter=express.Router();
//getting all the todo through admin side;
adminRouter.get("/get" ,tokenValidator ,isAdmin,adminRouterController)

//deleting a todo from admin side;
adminRouter.delete('/del/:id',tokenValidator,isAdmin,adminDelRouterController)

//updating a todo from admin side
adminRouter.patch("/update/:id",tokenValidator,isAdmin,adminRouterUpdater)


module.exports={
    adminRouter
}
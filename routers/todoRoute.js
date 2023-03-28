
const express=require('express')
const { tokenValidator, isAdmin } = require('../midlleware/validator')
const { todoRouterController, deleteRouterController, getallTodoRouter, singleUserRouter, updateRouterController } = require('../routecontroller/todoRouterController')

const todoRoute=express.Router()


todoRoute.get('/alltodo',tokenValidator ,isAdmin,getallTodoRouter)
todoRoute.get("/singleuser",tokenValidator,singleUserRouter)
todoRoute.post('/addtodo',tokenValidator, todoRouterController)
todoRoute.delete('/deltodo/:id',deleteRouterController)
todoRoute.patch('/update/:id',tokenValidator,updateRouterController)
module.exports={
    todoRoute
}
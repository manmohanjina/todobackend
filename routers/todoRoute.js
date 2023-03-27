
const express=require('express')
const { tokenValidator, isAdmin } = require('../midlleware/validator')
const { todoRouterController, deleteRouterController, getallTodoRouter, singleUserRouter } = require('../routecontroller/todoRouterController')

const todoRoute=express.Router()


todoRoute.get('/alltodo',tokenValidator ,isAdmin,getallTodoRouter)
todoRoute.get("/singleuser",tokenValidator,singleUserRouter)
todoRoute.post('/addtodo',tokenValidator, todoRouterController)
todoRoute.delete('/deltodo/:id',deleteRouterController)
module.exports={
    todoRoute
}
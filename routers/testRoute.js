
const mongoose=require('mongoose')
const express=require('express')
const { tokenValidator, isAdmin } = require('../midlleware/validator')

const testRoute=express.Router()

testRoute.get('/test',tokenValidator ,isAdmin,async(req,res)=>{
res.send("testing passed")
})

module.exports={
    testRoute
}
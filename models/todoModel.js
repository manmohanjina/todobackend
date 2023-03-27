
const mongoose=require('mongoose')

const todoSchema=mongoose.Schema({
 
    titel:{
        type:String,
        require:true,
    },
    status:{
        type:Boolean,
        require:true,
        default:false
    },
    additionalnote:{
        type:String,
        require:true
    },
    userID:String
   


})

const TodoModel=mongoose.model('alltodo',todoSchema)

module.exports={
    TodoModel
}
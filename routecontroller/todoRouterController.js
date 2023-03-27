const express = require("express");
const { TodoModel } = require("../models/todoModel");
const fs=require('fs')



const todoRouterController = async (req, res) => {
  try {
    const { titel, userID, additionalnote } = req.body;
    //console.log(userID,"userid ")
    if (!titel || !additionalnote) {
      return res.status(401).send({ error: "invalid input" });
    } else {
      let new_todo = await new TodoModel({ titel, additionalnote, userID });
      await new_todo.save();

      res.status(200).send({ success: "todo added success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "cannot add a todo" });
  }
};

const getallTodoRouter = async (req, res) => {
  try {
    const alltodo = await TodoModel.find();
    res.status(200).send({ data: alltodo });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "please try after some time", error });
  }
};

const singleUserRouter = async (req, res) => {
  try {
    const userTodo = await TodoModel.find();
    const id=fs.readFileSync('./key.txt',"utf-8")

   
   

    let singleuserTodo =  userTodo.filter((elm) =>{
        return elm.userID===id
   
    });
    if(singleuserTodo.length===0){
        return res.status(200).send({"error":"no todo found "})
    }
    else{
        res.status(200).send({"success":singleuserTodo})
    }
    
    res.send('ok')
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "cannot complete req now", error });
  }
};

const deleteRouterController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const finditem = await TodoModel.findOne({ id });
    if (!finditem) {
      return res.status(301).send({
        error: "item does not exists",
      });
    } else {
      await TodoModel.findByIdAndDelete({ id });
      res.status(200).send({ success: "item deleted success", finditem });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "canot delete try after some time", error });
  }
};

module.exports = {
  todoRouterController,
  deleteRouterController,
  getallTodoRouter,
  singleUserRouter,
};

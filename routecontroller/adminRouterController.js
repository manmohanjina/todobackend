const { TodoModel } = require("../models/todoModel");

const adminRouterController = async (req, res) => {
  try {
    let alltodos = await TodoModel.find();
    res.status(200).send({ todos: alltodos });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "canonot fullfill req", error });
  }
};


const adminDelRouterController=async(req,res)=>{
    try {
        const {id}=req.params;
        const isTodoPresent=await TodoModel.findById({_id:id})
        if(!isTodoPresent){
            return res.status(400).send({"error":"item not present"})
        }
        else{
            await TodoModel.findByIdAndDelete({_id:id})
         res.status(200).send({'success':"todo del succ"})
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).send({"error":"error while deleting try again",error})
    }
}

const adminRouterUpdater = async (req, res) => {
  try {
   
    const { id } = req.params;
    const {status,titel,additionalnote}=req.body;
   
    const isTodoAvail=await TodoModel.findOne({_id:id})
    
    if(!isTodoAvail){
        return res.status(400).send({"error":"no todo found with this id"})
    }
    else{
        let new_todo=await TodoModel.findByIdAndUpdate({_id:id},{status,titel,additionalnote})
        res.status(200).send({"succ":new_todo})
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "canonot fullfill req", error });
  }
};

module.exports = { adminRouterController, adminRouterUpdater,adminDelRouterController };

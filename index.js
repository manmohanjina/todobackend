const express = require("express");
const { connection } = require("./db/db");
const { forgotRouter } = require("./routers/forgotRouter");
const { loginRoute } = require("./routers/loginRouter");
const { registerRouter } = require("./routers/registerRouter");
const { testRoute } = require("./routers/testRoute");
const { todoRoute } = require("./routers/todoRoute");
const cors=require('cors');
const { adminRouter } = require("./routers/adminRouter");
const app = express();
app.use(cors())
app.use(express.json());
require("dotenv").config();


app.use("/user", registerRouter);
app.use("/user", loginRoute);
app.use('/',todoRoute)
app.use('/',forgotRouter)
app.use('/admin',adminRouter)
app.get("/",async(req,res)=>{
  try {
    res.status(200).send({"success":"welcome"})
  } catch (error) {
    console.log(error)
    res.status(500).send({"error":"error while loading",error})
  }
})

app.get('/',async(req,res)=>{
  res.send({"msg":"welcome"})
})

app.listen(process.env.port, () => {
  connection();
});

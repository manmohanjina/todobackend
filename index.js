const express = require("express");
const { connection } = require("./db/db");
const { forgotRouter } = require("./routers/forgotRouter");
const { loginRoute } = require("./routers/loginRouter");
const { registerRouter } = require("./routers/registerRouter");
const { testRoute } = require("./routers/testRoute");
const { todoRoute } = require("./routers/todoRoute");
const cors=require('cors')
const app = express();
app.use(cors())
app.use(express.json());
require("dotenv").config();

app.use('/',testRoute)
app.use("/", registerRouter);
app.use("/", loginRoute);
app.use('/',todoRoute)
app.use('/',forgotRouter)

app.listen(process.env.port, () => {
  connection();
});

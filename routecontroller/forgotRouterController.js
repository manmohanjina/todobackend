
const { registerModel } = require("../models/registerModel");
require("dotenv").config();
const bcrypt = require("bcrypt");

const UserForgotPassword = async (req, res, next) => {
  
  try {
    const { email, newpassword, security } = req.body;
    if (!email || !newpassword || !security) {
      return res.status(400).send({
        error: "fill all feilds",
      });
    } else {
      let findUser = await registerModel.findOne({ email });
      if (!findUser) {
        return res.status(400).send({ error: "email address not registered" });
      }
      if (findUser.security !== security) {
        return res
          .status(400)
          .send({ error: "security key provided was not matched" });
      }

      const saltround = +process.env.saltround;
      const id = findUser._id;
      console.log(id, "id of user ");
      bcrypt.hash(newpassword, saltround, async (err, hashed_pass) => {
        if (err) {
          return res.status(300).send({
            error: "try after some time",
            err,
          });
        } else {
          await registerModel.findByIdAndUpdate(id,{password:hashed_pass
        });
        res.status(200).send({"success":"password updated success "})
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "please try after some time",
      error,
    });
  }
};


module.exports={
    UserForgotPassword
}

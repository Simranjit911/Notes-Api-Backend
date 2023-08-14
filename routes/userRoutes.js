const express = require("express")
const userRouter = express.Router()
const { signup, signin } = require("../controllers/userController")


// SignUp
userRouter.post("/signup",signup)

//Signin
userRouter.post("/signin",signin)
module.exports = userRouter
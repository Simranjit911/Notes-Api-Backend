const express=require("express")
const { getnote, createnote, deletenote, updatenote } = require("../controllers/noteController")
const notesRouter=express.Router()
const auth=require("../middleware/auth")

//Get 
notesRouter.get("/",auth,getnote)
//Post
notesRouter.post("/", auth,createnote)
//delete
notesRouter.delete("/:id",auth,deletenote)
//
notesRouter.put("/:id",auth,updatenote)


module.exports=notesRouter  
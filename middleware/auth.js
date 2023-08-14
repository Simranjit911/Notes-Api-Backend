const jwt=require("jsonwebtoken")
const SECRET_KEY="NOTESAPI"
const auth=(req,res,next)=>{
    try {
        let token=req.headers.authorization
        if(token){
            token=token.split(" ")[1]
            let user=jwt.verify(token,SECRET_KEY)
            req.userid=user.id
        }else{
            res.status(401).send("Unauthorized user")
        }
        next()
    } catch (error) {
        res.status(401).send("Unauthorized user")
        
    }
}
module.exports=auth
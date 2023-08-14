const mongoose=require("mongoose")
let userSchema
if(mongoose.models && mongoose.models.User){
    module.exports = mongoose.model('ModelName');
}else{
     userSchema=mongoose.Schema({
        name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{    
        type:String,
        required:true
    },
},{timestamps:true})
}

module.exports=mongoose.model("User",userSchema)
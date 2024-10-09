const mongoose=require("mongoose");
const x=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Text:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("notes",x);

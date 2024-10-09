const mongoose=require("mongoose");
const url="mongodb://localhost:27017/notes";
const connectTodb=async ()=>{
    try{
        const x=await mongoose.connect(url);
        console.log("connected with the database");
    }
    catch(error){
        console.log("can't connect with database");
    }
}
module.exports=connectTodb;
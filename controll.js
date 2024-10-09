const noteSchema=require("../models/model");
const addnote=async(req,res)=>{
    try{
        const data=req.body;
        if(data.Title.length==0 && data.Text.length==0){
            res.status(400).json({msg:"Can't Add Empty Note"});
        }
        else if(data.Title.length==0){
            res.status(400).json({msg:"Please Type A Title For Save The Note"});
        }
        else if(data.Text.length==0){
            res.status(400).json({msg:"Please Type Text With In The Note"});
        }
        else{
            const x=await noteSchema.create({Title:data.Title,Text:data.Text});
            res.status(200).json({msg:"Note Added Successfully"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const allnote=async (req,res)=>{
    try{
        const data=await noteSchema.find({});
        res.status(200).json(data);
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const delnote=async (req,res)=>{
    try{
        const id=req.body.id;
        const x=await noteSchema.deleteOne({_id:id});
        res.status(200).json({msg:"Deleted Successfully"});
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
module.exports={addnote,allnote,delnote};

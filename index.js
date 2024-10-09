const express=require("express");
const connectTodb=require("./connection/connect");
const r=require("./route/route");
const app=express();
app.use(express.json());
const cors=require("cors");
const corsOption={
    origin:"http://localhost:5173",
    methods:"POST,GET,PATCH,DELETE,HEAD,PUT",
    Credential:true
}
app.use(cors(corsOption));
app.use("",r);
const port=3000;
connectTodb().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at ${port}`);
    })
})
const express=require("express");
const { addnote, allnote, delnote } = require("../controller/controll");
const r=express.Router();
r.route("/add").post(addnote);
r.route("/show").get(allnote);
r.route("/delete").delete(delnote);
module.exports=r;
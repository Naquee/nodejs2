const express  = require ("express");
// const fs = require("fs")

const messagesRouter = express.Router();

messagesRouter.post("/add" , (req,res) => {
    console.log(req.body)
    res.send("recived your messages")
})

messagesRouter.get("/" , (req,res) => {

    res.send("messages")
})

messagesRouter.delete("/delete" , (req,res) => {
    res.send("delete")
})
module.exports= {messagesRouter}
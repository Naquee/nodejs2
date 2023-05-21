const express = require("express");

import { messagesRouter } from "./routes/messages.route";

const app = express();

const cors = require("cors")
app.use(cors())

app.use(express.json())

// Miidleware start
// function -> which has access to request object , response object and next()
// app.use((req,res,next) => {
//     console.log(`method is ${req.method} and Url is ${req.url}`)
//     console.log("a")
//     let startTime = new Date().getTime();
//     next();
//     console.log("z")
//     const endTime= new Date().getTime();

//     console.log(endTime-startTime)
   
// })

// app.get("/" , (req,res) => {
//     res.send("welocome to Home")
// })

// app.get("/about" , (req,res) => {
//     res.send("welocome to about")
// })

// app.get("/contact" , (req,res) => {
//     res.send("welocome to contact")
//     // console.log("1")
// })

// app.listen(8080, () => {
//     console.log("Loisten on port at 8080")
// })

app.get("/", (req,res) => {
    res.send("Eelcome to Home")
})

app.use("/messages", messagesRouter)


app.listen(8080, () => {
    console.log("Listen on port at 8080")
})
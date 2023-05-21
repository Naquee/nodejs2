const express = require("express");

const {connection,StudentModel} = require("./db")

const app = express();

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Welcome to Homepage")
})

app.get("/student",async(req,res) => {
    const result = await StudentModel.find()
    res.send(result)
})

app.post("/addstudent", async(req,res) => {
    const data = req.body;
    const student= await StudentModel.insertMany([data])

    // const student= new StudentModel(data)
    // await student.save();
    
    res.send(student)
})

app.listen(8080, async() => {
    try{
        await connection
        console.log("connected To DB successfully")
    }
   catch(err){
    console.log("Error Connection to DB")
    console.log(err)
   }
    console.log("Listen on 8080")
})


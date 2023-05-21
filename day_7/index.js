
const express =require("express")

const {connection} = require("./db")

const {StudentRouter} = require("./routes/student.route")

const {IaRouter} = require("./routes/ia.route")

const app= express();

app.use(express.json())

app.get("/", (req,res) => {
    res.send("api Home Page try Other routes")
})

app.use("/student",StudentRouter)

app.use("/ia",IaRouter )

app.listen(8008, async() => {
    try{
        await connection
        console.log("coonect to DB successfully")

    }
    catch(err){
        console.log("error connext to db")
        console.log(err)

    }
    console.log("listen on port 8008")
})
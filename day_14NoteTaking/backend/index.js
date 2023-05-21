const express =require("express");
const { connection } = require("./config/db");
const { notesController } = require("./routes/notes.routes");
const { userController } = require("./routes/user.routes");

const app=express();

const PORT=8080;

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Home Page")
})

app.use("/user" , userController)

app.use("notes",notesController)


app.listen(PORT, async ()=> {
    try{
       await connection
        console.log("connected to DB successful")
    }
    catch(err){
        console.log("Erroe connected to DB")
        console.log(err)
    }
    console.log(`Listen on PORT ${PORT}`)
})


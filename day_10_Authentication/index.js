const express = require("express")

const jwt = require("jsonwebtoken")

const bcrypt = require('bcrypt');

const {connection} = require("./config/db")
const { userModel } = require("./model/User.model")


const app = express()

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Home Page")
})

app.get("/dashboard", (req,res) => {
    // res.send("Dashboard")
    // const {token} = req.query;
    const token = req.headers.authorization.split(" ")[1]
    //  need Bearer

    try{
        var decoded = jwt.verify(token, 'naki123');
        console.log(decoded)
        res.send("show Dashboard data...")
    }
    catch(err){
        console.log(err)
        res.send("please Login again")
    }

    // http://localhost:8004/dashboard?token=54321
 
})

app.post("/signup",async (req,res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 5, async function(err, hashed_password) {
        // Store hash in your password DB.
        if(err){
            res.send("something went wrong plz Signup later")
        }
        const new_user = new userModel({
            email : email,
          password : hashed_password
         })
         await new_user.save()
         res.send("signup successful")
    });

})

app.post("/login", async (req,res) => {
    const {email, password} =req.body
    const user = await userModel.findOne({email})
    console.log(user)
    
    const hashed_password = user.password

    bcrypt.compare(password, hashed_password, function(err, result) {
        if(result){
            const token = jwt.sign({ email: email }, 'naki123');
             res.send({"msg": "login Successful", "token": token})
         }
         else{
             res.send("login Failed")
         }
    });
})



app.listen(8004, async() => {
    try{
       await connection
       console.log("connection DB to Successful")
    }
    catch(err){
        console.log(err)
        console.log("failed to connect")
    }
    console.log("Listen on port 8004")
})
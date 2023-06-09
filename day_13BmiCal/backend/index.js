
// const express = require("express");

// const {connection} = require("./config/db");
// const { UserModel } = require("./models/User.Model");
// const bcrypt = require('bcrypt');

// var jwt = require('jsonwebtoken');
// const { authentication } = require("./middlewares/authentication");

// require("dotenv").config();


// const app = express();
// app.use(express.json())


// app.get("/", (req,res) => {
//     res.send("Home Page")
// })

// app.post("/signup", async (req,res) => {
//     const {name,email, password} =req.body;

//     const isUser = UserModel.findOne({email})
//     if(isUser){
//         res.send("User Already exist plz try login")
//     }
//     bcrypt.hash(password, 4, async function(err, hash) {
//         // Store hash in your password DB.
//         if(err){
//             res.send("Something went wrong please login agin")
//         }
//         const new_user = new UserModel({
//             name,
//             email,
//             password:hash
//         })
//         try{
//             await new_user.save()
//             res.send("signup successfully")
//         }
//         catch(err){
//             res.send("something went wrong")
//         }
//     });

   
    

// })

// app.post("/login", async (req,res) => {
//     const {email, password} =req.body;
//     const user =await UserModel.findOne({email})
//     const hased_password = user.password;
//     const user_id=user._id
//     // console.log(user_id)
//     bcrypt.compare(password, hased_password, function(err, result) {
//         // result == true
//         if(err){
//             res.send("Something Went Wrong please try agnain")
//         }
//         if(result){
//             var token = jwt.sign({ user_id }, process.env.SECRET_KEY);
//             res.send({message:"Login Successful",token})
//         }
//         else{
//             res.send("Login Failed")
//         }
//     });
// })

// app.get("/getProfile",authentication, async (req,res) => {
  
//     const {user_id} = req.body;
//     // console.log(user_id)
//     const user =await UserModel.findOne({id:user_id})
//     console.log(user)
//     // const {name, email} = user
//     // res.send({name, email})
//     res.send("Profile page")
    
// })



const express = require("express")
const cors = require("cors")

const {connection} = require("./config/db")

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const { UserModel } = require("./models/User.Model");
const { authentication } = require("./middlewares/authentication");
const { BmiModel } = require("./models/BmiModel");

require("dotenv").config()

const app = express(); 

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello")
    
})

app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body

    const isUser = await UserModel.findOne({email})
    if(isUser){
        res.send({"msg" : "User already exists, try logging in"})
    }
    else {
        bcrypt.hash(password, 4, async function(err, hash) {
        if(err){
            res.send("Something went wrong, please try again later")
        }
        const new_user = new UserModel({
            name,
            email,
            password : hash
        })
        try{
            await new_user.save()
            res.send({"msg" : "Sign up successfull"})
        }
        catch(err){
            res.send({"msg" : "Something went wrong, please try again"})
        }
    });
}
})


app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    const hashed_password = user.password;
    const user_id = user._id;
    console.log(user)
    console.log(hashed_password)
    bcrypt.compare(password, hashed_password, function(err, result) {
          if(err){
            res.send({"msg" : "Something went wrong, try again later"})
          }
          if(result){
            const token = jwt.sign({user_id}, process.env.SECRET_KEY);  
            res.send({message : "Login successfull", token})
          }
          else{
            res.send({"msg" : "Login failed"})
          }
    });
})

app.get("/getProfile", authentication, async (req, res) => {
    const {user_id} = req.body
    const user =await  UserModel.findOne({_id : user_id})
    const {name, email} = user
    res.send({name, email})

})


app.post("/calculateBMI", authentication,async (req,res) => {
    const {height,weight,user_id} =req.body;
    const height_in_meter = Number(height)*0.3048;
    const BMI = Number(weight)/(height_in_meter)**2

    const new_bmi = new BmiModel({
        BMI,
        height : height_in_meter,
        weight,
        user_id
    })
    await new_bmi.save();
    res.send({BMI})
})

app.get("/getCalculation", authentication,async (req,res) => {
    const {user_id} =req.body;
   const all_bmi = await BmiModel.find({user_id: user_id})
   res.send({history: all_bmi})

})

app.listen(8004,async(req,res) => {
    try{
        await connection;
        console.log("Connect to DB Successful")
    }
    catch(err){
        console.log("Error Connect to DB ")
        console.log(err)
    }
    console.log("port on 8004")
    

})
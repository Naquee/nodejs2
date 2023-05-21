const {Router} = require("express")
const bcrypt =require("bcrypt");
const { UserModel } = require("../models/User.model");

const jwt = require('jsonwebtoken');


const userController = Router();

userController.post("/signup", (req,res) => {
    const {email, password, age} = req.body;
    bcrypt.hash(password, 4, async function(err, hash) {
     if(err){
        res.send("something went wrong")
     }
     const User= new UserModel({
        email,
        password:hash,
        age
     })
     try{
        await User.save();
        res.send({msg:"Signup Successful"})
     }
     catch(err){
        console.log(err);
        res.send("something went wrong please try again")
     }
    });
    

    // console.log(email, password, age)
})

userController.post("/login", async (req,res) => {
    // res.send("login")
   const {email, password} = req.body;
   const user = await UserModel.findOne({email});
   const hash = user.password
   bcrypt.compare(password, hash, function(err, result) {
      // result == true
      if(err){
         res.send("Somthing went Wrong pease try again")
      }
      if(result){
         const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
         res.send({message:"Login Successful", token})
      }
      else{
         res.send("Invalid crential plz signup")
      }
  });


})

module.exports ={userController}


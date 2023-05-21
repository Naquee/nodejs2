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

const authentication = (req,res,next) => {
    const token = req.headers?.authorization?.split(" ")[1]
    try{
        var decoded = jwt.verify(token, 'naki123');
        req.body.email= decoded.email
        next() 
    }
    catch(err){
        res.send("please login agian")
     
    }

}

const authorisation = (permittedrole) => {
    //permittedrole = ["ia", "instructor"] or ["customber"] or ["seller"]
    // so need incdludes
  return async(req,res,next) => 
   {
    const email = req.body.email
    const user = await userModel.findOne({email:email})
        const role = user.role
        //1 check the role
        if(permittedrole.includes(role)){
            next()
        }
        else{
            res.send("Not Authorised")
        }
   }

}


app.get("/dashboard",authentication, (req,res) => {
res.send("Here is Your Dashboard")
 
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

app.get("/report", (req,res) => {
    res.send("Some Important report")
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
         }``
    });
})

// no authentication no authorization
app.get("/product", (req,res) => {
    res.send("products data")
})

// need authenticaion no authorization
app.get("/products/cart", (req,res) => {
        res.send("Here are Your prducts Cart data...")

})

// authentication Authorisation
app.post("/products/create",authentication,authorisation(["seller"]),  async (req,res) => {
        res.send("Products created")
  
})

//Autherisation (customber =>permission for thois Routes)       
app.post("/productFeedback",authentication,authorisation(["customber"]),  async (req,res) => {
    res.send("ProductFeedback")

})

app.post("/assignment/edit",authentication,authorisation(["ia", "instructor"]),  async (req,res) => {
    res.send("Assignment edit")

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
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String , required : true},
    role: {type: String, enum : ["customber"], default:"customber"},
    // age: {type :Number, enum: [18,19,20,21,22], default:18}
})

const userModel = mongoose.model("user", userSchema)

module.exports ={
    userModel
}
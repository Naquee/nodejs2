const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://revday7:revday7@cluster0.e6qnmi3.mongodb.net/test")


module.exports ={
    connection
 
}
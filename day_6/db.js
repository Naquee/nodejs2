const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://127.0.0.1:27017/web26")

const studentSchema = mongoose.Schema({
    name: String,
    age: Number,
    course: String
},{versionKey:false})


const StudentModel = mongoose.model('student', studentSchema )

module.exports ={
    connection,
    StudentModel
}

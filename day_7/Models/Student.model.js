const mongoose =require("mongoose")

const studentSchema = new mongoose.Schema({
    name: String,
    age : {type:Number, required: true},
    course :String
})

const StudentModel = mongoose.model("student", studentSchema)

module.exports ={
    StudentModel
}
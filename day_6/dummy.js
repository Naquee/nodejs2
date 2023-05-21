const mongoose = require("mongoose")

const main = async() => {
    console.log("hello")
    try{
        const connection =await mongoose.connect("mongodb://127.0.0.1:27017/web26")
        console.log("connextion successful")

        // await StudentModel.insertMany([{name: 'Alam', age :20, course: "IA"}])
        const result = await StudentModel.find();
        console.log(result)
        connection.disconnect();
    }
    catch(err){
        console.log(err)
    }

   
}
main();

const connection = mongoose.connect("mongodb://127.0.0.1:27017/web26")

const studentSchema = mongoose.Schema({
    name: String,
    age: Number,
    course: String
},{versionKey:false})


const StudentModel = mongoose.model('student', studentSchema )

module.exports ={
    connection
}


const instructorSchema = mongoose.Schema({
    name: String,
    age: Number,
    role: String
},{versionKey:false})

const InstructorModel = mongoose.model('instructor', instructorSchema )

// __v -> versionkey

//1. we'll gives singular -> it'ill convert to plural
//2. the first letter should be capital

//classes -> object
// contructor function -> objects
//model -> documents

const {StudentModel} = require("../Models/Student.model")



const  getStudent = async (req,res) => {
    const Student_data= await StudentModel.find()
    res.send(Student_data)
}

const getStudentByName =  async (req,res) => {
    console.log(req.params.studentname)
    const Student_data= await StudentModel.find({name:req.params.studentname})
    res.send(Student_data)
    // http://localhost:8080/student/Alam
}

const postStudent = async(req,res) => {
    const payload = req.body;
    // console.log(payload)
    if(!payload.age || !payload.name || !payload.course ){
        res.send("please fill all required fields")
    }
    if(payload.course==="MERN"){
        await StudentModel.insertMany([payload])
        res.send("Student data created successfully")
    }
    else{
        res.send("please enter valid course")
    }
}

const StudentController = {
    getStudent,
    getStudentByName,
    postStudent
}

module.exports = StudentController
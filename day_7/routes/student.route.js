const {Router} = require("express");
const StudentController = require("../controllers/student.controller");




const StudentRouter = Router();

StudentRouter.get("/", StudentController.getStudent)

StudentRouter.get("/:studentname", StudentController.getStudentByName )

StudentRouter.post("/addStudent", StudentController.postStudent )

module.exports ={
    StudentRouter
}
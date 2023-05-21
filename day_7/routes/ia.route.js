const {Router} =require("express")

const {IA} = require("../Models/IA.model")

const IaRouter = Router();

IaRouter.get("/", async(req,res)=> {
    const Ia_data= await IA.find()
    res.send(Ia_data)

})

module.exports = {
    IaRouter
}
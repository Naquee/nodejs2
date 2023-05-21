const {Router} = require("express");
const { NoteModel } = require("../models/Note.models");

require("dotenv").config();

const notesController = Router();

notesController.get("/", async (req,res) => {
    const {tag} = req.body;
    const notes = await NoteModel.find({userId:req.body.userId, tag})

    res.send(notes)
})

notesController.post("/create", async (req,res) => {
    const {Heading,Note, Tag,userId} = req.body;
    // console.log(req.body)
    console.log(Heading,Note, Tag,userId)
    const note = new NoteModel({
        Heading,
        Note,
        Tag,
        userId
    })
    try{
        await note.save();
        res.send("Note created")
    }
    catch(err){
        res.send("someting went wrong")
    } 
})



// notesController.delete("/delete/:noteId", async (req,res) => {
//     const {noteId} = req.params;
//     const deleteNote = await NoteModel.findOneAndDelete({_id : noteId, noteId : req.body.userId})
//     const notes = await NoteModel.find({userId:req.body.userId, tag})

//     if(deleteNote){
//         res.status(200).send("Delete")
//     }
//     else{
//         res.send("couldn't delete")

//     }
    
// })


module.exports = {notesController}
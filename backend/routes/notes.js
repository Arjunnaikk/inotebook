const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all the notes using GET "/api/auth/login".login required
router.get('/fetchallnotes',fetchuser ,async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id})
        res.json(notes)
    } catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// ROUTE 2: Add a new note using POST "/api/auth/login".login required
router.post('/addnote', fetchuser ,[
    body('title','Title cannot be Empty').isLength({min:1}),
    body('description','Description cannot be empty').isLength({min:1})
] ,async (req,res)=>{
    try {
        const {title, description, tag} = req.body
        const errors = validationResult(req);
        //if there are errors return bad req and errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title,description ,tag,user : req.user.id
        })
        const saveNotes = await notes.save()
        res.json(saveNotes)
    } catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// ROUTE 2: Update the existing note notes using PUT "/api/auth/Updatenote".login required
router.put('/updatenote/:id',fetchuser ,async (req,res)=>{
    try{
    const {title, description, tag} = req.body
    //Create a new node
    const newNote = {}
    if(newNote){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Find the node to be updated and update it
    let note =await Notes.findById(req.params.id)
    if(!note){res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
    res.json({note})
})

// ROUTE 4: Delete the existing note notes using DELETE "/api/auth/deletenote".login required
router.delete('/deletenote/:id',fetchuser ,async (req,res)=>{
    try{
    const {title, description, tag} = req.body
    //Create a new node
    const newNote = {}
    if(newNote){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Find the node to be delete and delete it
    let note =await Notes.findById(req.params.id)
    if(!note){res.status(404).send("Not Found")}

    //Delete if user ows the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
        note = await Notes.findByIdAndDelete(req.params.id)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
    res.json({note})
})
module.exports = router
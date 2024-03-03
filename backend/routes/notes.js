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

// ROUTE 3: Add a new note using POST "/api/auth/login".login required
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

module.exports = router
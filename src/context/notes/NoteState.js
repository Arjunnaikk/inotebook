import React from "react";
import noteContext from "./noteContext"
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
        {
            "_id": "65e470c4ed02d4d054c9b2c7",
            "user": "65e458e730ea954f34647c98",
            "title": "My first Note updated",
            "description": "This is my first Note updated",
            "tag": "personal",
            "Date": "2024-03-03T12:44:52.115Z",
            "__v": 0
        },
        {
            "_id": "65e470c4ed02d4d054c9b1c7",
            "user": "65e458e730ea954f34647c98",
            "title": "My first Note updated",
            "description": "This is my first Note updated",
            "tag": "personal",
            "Date": "2024-03-03T12:44:52.115Z",
            "__v": 0
        },
        {
            "_id": "65e470c4ed02d4d054c922c7",
            "user": "65e458e730ea954f34647c98",
            "title": "My first Note updated",
            "description": "This is my first Note updated",
            "tag": "personal",
            "Date": "2024-03-03T12:44:52.115Z",
            "__v": 0
        },
        {
            "_id": "65e470c4ed02d4d054c932c7",
            "user": "65e458e730ea954f34647c98",
            "title": "My first Note updated",
            "description": "This is my first Note updated",
            "tag": "personal",
            "Date": "2024-03-03T12:44:52.115Z",
            "__v": 0
        },
        {
            "_id": "65e470c4ed02d4d054c9b4c7",
            "user": "65e458e730ea954f34647c98",
            "title": "My first Note updated",
            "description": "This is my first Note updated",
            "tag": "personal",
            "Date": "2024-03-03T12:44:52.115Z",
            "__v": 0
        },
        {
            "_id": "65e470c4ed02d4d054c9b6c7",
            "user": "65e458e730ea954f34647c98",
            "title": "My first Note updated",
            "description": "This is my first Note updated",
            "tag": "personal",
            "Date": "2024-03-03T12:44:52.115Z",
            "__v": 0
        },
        {
            "_id": "65e470c4ed02d4d054c9b7c7",
            "user": "65e458e730ea954f34647c98",
            "title": "My first Note updated",
            "description": "This is my first Note updated",
            "tag": "personal",
            "Date": "2024-03-03T12:44:52.115Z",
            "__v": 0
        },
        {
            "_id": "65e470c6ed02d4d054c9b2c9",
            "user": "65e458e730ea954f34647c98",
            "title": "My first Note",
            "description": "This is my first Note",
            "tag": "personal",
            "Date": "2024-03-03T12:44:54.509Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    //Add a Note
    const addNote = (title, description, tag)=>{
        const note={
            "_id": "65e470c6ed02d4d054c9b2c9",
            "user": "65e458e730ea954f34647c98",
            "title": "My first Note",
            "description": "This is my first Note [ADDED]",
            "tag": "personal",
            "Date": "2024-03-03T12:44:54.509Z",
            "__v": 0
    }
        setNotes(notes.push(note))
    }

    //Update a Note
    const updateNote = ()=>{
        
    }

    //Delete a Note
    const deleteNote = ()=>{

    }
    
        return (
            <noteContext.Provider value={{notes, addNote, updateNote, deleteNote}}>
                {props.children}
            </noteContext.Provider>
        )
}

export default NoteState;
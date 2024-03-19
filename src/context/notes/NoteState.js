import React from "react";
import noteContext from "./noteContext"
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    //Get all Note
    const getNotes =async ()=>{
                //API Call
                const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-header":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNDU4ZTczMGVhOTU0ZjM0NjQ3Yzk4In0sImlhdCI6MTcwOTQ2MzgyNH0.9VQEpAxwF7aUxhN2y605eLCXkGxa9Aa8kG28pwtys_Q"
                    },
                    });
                    const json =await response.json();
                    setNotes(json)
                    
    }
    //Add a Note
    const addNote = async (title, description, tag)=>{
                //API Call
                const response = await fetch(`${host}/api/notes/addnote`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-header":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNDU4ZTczMGVhOTU0ZjM0NjQ3Yzk4In0sImlhdCI6MTcwOTQ2MzgyNH0.9VQEpAxwF7aUxhN2y605eLCXkGxa9Aa8kG28pwtys_Q"
                    },
                    body: JSON.stringify({title, description, tag}),
                    });
        const note={
            "_id": "65e470c2ed02d4d054c9b2c9",
            "user": "65e458e730ea954f34647c98",
            "title": title,
            "description": description,
            "tag": tag,
            "Date": "2024-03-03T12:44:54.509Z",
            "__v": 0
    }
        setNotes(notes.concat(note))
    }

    //Update a Note
    const updateNote =async (id, title, description, tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-header":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNDU4ZTczMGVhOTU0ZjM0NjQ3Yzk4In0sImlhdCI6MTcwOTQ2MzgyNH0.9VQEpAxwF7aUxhN2y605eLCXkGxa9Aa8kG28pwtys_Q"
            },
            body: JSON.stringify({title, description, tag}),
            });
                const json =await response.json();
                console.log(json);
                
        
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
            }
            
        }
    }

    //Delete a Note
    const deleteNote =async (id)=>{
                //API Call
                const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-header":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNDU4ZTczMGVhOTU0ZjM0NjQ3Yzk4In0sImlhdCI6MTcwOTQ2MzgyNH0.9VQEpAxwF7aUxhN2y605eLCXkGxa9Aa8kG28pwtys_Q"
                    }
                    });

        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    
        return (
            <noteContext.Provider value={{notes,getNotes, addNote, updateNote, deleteNote}}>
                {props.children}
            </noteContext.Provider>
        )
}

export default NoteState;
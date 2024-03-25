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
                        "auth-header":localStorage.getItem("token")
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
                        "auth-header":localStorage.getItem("token")
                    },
                    body: JSON.stringify({title, description, tag}),
                    });
    const note =await response.json();
        setNotes(notes.concat(note))
    }

    //Edit a Note
    const editNote =async (id, title, description, tag)=>{
        console.log(id);
        
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-header":localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag}),
            });
                const json =await response.json();
                console.log(json);
                
        // let newNotes = JSON.parse(JSON.stringify(notes))
        // for (let index = 0; index < notes.length; index++) {
        //     const element = newNotes[index];
        //     if (element._id === id) {
        //         newNotes[index].title = title
        //         newNotes[index].description = description
        //         newNotes[index].tag = tag
        //         break;
        //     }
            
        // }
        // setNotes(newNotes)
        getNotes();
    }
    const deleteNote = async (id) => {
        try {
            //API Call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-header": localStorage.getItem("token")
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the note');
            }
    
            const newNotes = notes.filter((note) => { return note._id !== id });
            setNotes(newNotes);
        } catch (error) {
            console.error('Error deleting note:', error.message);
        }
    }
    

        return (
            <noteContext.Provider value={{notes,getNotes, addNote, editNote, deleteNote}}>
                {props.children}
            </noteContext.Provider>
        )
}

export default NoteState;
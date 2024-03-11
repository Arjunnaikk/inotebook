import React from "react";
import noteContext from "./noteContext"

const NoteState = (props)=>{
    const state = {
        "name":"Arjun",
        "class":"SEB"
    }
        return (
            <noteContext.Provider value={state}>
                {props.children}
            </noteContext.Provider>
        )
}

export default NoteState;
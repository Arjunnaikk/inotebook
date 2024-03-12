import React from "react";
import noteContext from "./noteContext"
import { useState } from "react";

const NoteState = (props)=>{
    const s1 = {
        "name":"Arjun",
        "class":"SEB"
    }
    const [state, setState] = useState(s1)
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name":"Naik",
                "class":"TEB"
            })
        }, 4000);
    }
        return (
            <noteContext.Provider value={{state,update}}>
                {props.children}
            </noteContext.Provider>
        )
}

export default NoteState;
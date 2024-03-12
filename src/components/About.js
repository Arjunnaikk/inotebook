import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { useEffect } from 'react'

const About =() => {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    
  return (
    <>
        <div>
            this is about {a.state.name} and his class {a.state.class}
        </div>
    </>
  )
}

export default About
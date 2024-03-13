import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { useEffect } from 'react'

const About =() => {
    const a = useContext(noteContext)
    
  return (
    <>
        <div>
            this is about
        </div>
    </>
  )
}

export default About
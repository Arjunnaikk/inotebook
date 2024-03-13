import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';
import Addnote from './Addnote';

// import { Navbar } from './Navbar';

export const Home = () => {
  const context = useContext(noteContext)
  const {notes, setNotes} = context;
  return (
    <>
    <div>
      <Notes/>
    </div>
    </>
  )
}

export default Home;

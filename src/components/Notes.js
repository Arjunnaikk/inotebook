import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'

const Notes = () => {
  const context = useContext(noteContext)
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])
  const [note, setNote] = useState({etitle:"", edescription:"", etag:"Default"})
  const ref = useRef(null)
  const handleClick=(e)=>{
    console.log('Updating the note...',note);
    e.preventDefault()
  }
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle:currentNote.title, edescription :currentNote.description, etag: currentNote.tag})
  }
  const onChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <>
    <Addnote />
    <button type="button" className="btn btn-primary my-3 d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                <div id="emailHelp" className="form-text">Enter the Title</div>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
              </div>
              <button type="submit" className="btn btn-dark" onClick={handleClick}>Add Note</button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onClick={handleClick} className="btn btn-dark">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
      })}
    </div>
    </>
  )
}

export default Notes
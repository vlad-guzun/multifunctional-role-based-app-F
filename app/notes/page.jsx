'use client';

import { useEffect, useState } from 'react';
import NoteServices from '@/services/NoteServices';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [note,setNote] = useState({
    title: '',
    body: ''
  })

  useEffect(() => {
    async function fetchUsers() {
      const notes = await NoteServices.getNotes();
      setNotes(notes);
    }
    fetchUsers();
  }, [notes]);

  const handleChange = (e) => {
    e.preventDefault()
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  }

  const createNote = async (e) => {
    e.preventDefault()
   const notes = await NoteServices.addNote(note)
    console.log(notes)
  }
  const deleteNote = async (id) => {
    await NoteServices.deleteNote(id)
  }
 
  return (
    <>
        <div className="flex flex-col items-center mt-10">
        <h1 className="text-5xl text-gray-800 mb-5">Create a note</h1>
        <form onSubmit={(e) => createNote(e)}>
          <input name='title' value={note.title} onChange={handleChange} className="w-80 p-2 border border-gray-300 mb-3" placeholder="Write a title" />
          <input name='body' value={note.body} onChange={handleChange} className="w-80 p-2 border border-gray-300 mb-3" placeholder="Write a description" />
          <button>create note</button>
        </form>
      </div>




       {notes.length === 0 ? <h1 className="text-5xl text-center text-gray-800 mt-10 mb-5"><b className='text-orange-600'>(no notes)</b> add some notes</h1> : (
<div>
      

      <h1 className="text-5xl text-center text-gray-800 mt-10 mb-5">My notes</h1>
      
      <table className="mx-auto">
        <tbody>
          {notes.map((note) => (
            <tr key={note._id} className="border-b-2 border-gray-300">
              <td className="p-3">
                <h2 className="text-3xl text-purple-500">
                  <b>Title:</b> {note.title}
                </h2>
                <p className="text-2xl text-gray-800">
                  <b>Description:</b> {note.body}
                </p>
              </td>
              <td className="p-3">
                <button onClick={() => deleteNote(note._id)} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
    </>
  );
};

export default NotesPage;

import axios from 'axios'

export default {
    
    
    //_____________________________GET user NOTES_______________________________________
    getNotes: async() => {
        const response = await axios.get('http://localhost:5000/user/note',{withCredentials: true})
        const notes = response.data.UserNotes
       return notes
    },




    //_____________________________DELETE a single user note_______________________________________
    deleteNote: async(noteId) => {
        fetch(`http://localhost:5000/user/note/${noteId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(data => {console.log(data)})
    },





    //_____________________________ADD NOTE_______________________________________
    addNote: async(note) => {
        return fetch('http://localhost:5000/user/note',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }).then(res => res.json())
          .then(data => data)
          .then(userNotes => userNotes)
    }
}

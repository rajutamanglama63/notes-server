import { useEffect, useState } from "react";
// import axios from "axios";
import noteApiServices from "./api/notes";
import Note from "./components/Note";
import Footer from "./components/Footer";
import Notification from "./components/Notification";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const [showAll, setShowAll] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    // axios.get("http://localhost:5000/notes")
    noteApiServices.getAllNotesObj().then((data) => {
      setNotes(data);
    });
    // .then((result) => {
    //   setNotes(result.data);
    //   console.log("rendered");
    // });
  }, []);

  const btnToggle = () => {
    setShowAll(!showAll);
  };

  let noteToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const submitHandler = (e) => {
    e.preventDefault();

    let note = {
      // id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5 ? true : false,
    };

    // axios.post("http://localhost:5000/notes", note)
    noteApiServices
      .postNoteObj(note)
      .then((note) => {
        // console.log(note);
        setNotes([...notes, note]);
        setNewNote("");
      })
      .catch((err) => {
        console.dir(err);
        setErrMsg(err);
        setTimeout(() => {
          setErrMsg(null);
        }, 2000);
      });
  };

  const btnToggleHandler = (id) => {
    // console.log(notes);
    const note = notes.find((n) => n.id === id);
    console.log(note);
    const toUpdate = { ...note, important: !note.important };

    // axios.put(`http://localhost:5000/notes/${id}`, toUpdate)
    noteApiServices
      .updateNoteObj(id, toUpdate)
      .then((data) => {
        // console.log(data);
        setNotes(notes.map((a) => (a.id !== id ? a : data)));
      })
      .catch((err) => {
        console.dir(err);
        // setErrMsg(err);
        setTimeout(() => setErrMsg(null), 2000);
      });
  };
  return (
    <div>
      <h1>Heroku Notes App</h1>
      <Notification message={errMsg} />
      <form onSubmit={submitHandler}>
        <input
          placeholder="enter new note here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">create note</button>
      </form>
      <br />
      <button onClick={btnToggle}>show {showAll ? "important" : "all"}</button>
      <ul>
        {noteToShow.map((note) => (
          <Note key={note.id} note={note} btnToggleHandler={btnToggleHandler} />
        ))}
      </ul>

      <Footer />
    </div>
  );
}

export default App;

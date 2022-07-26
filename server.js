// not using express framework
// const http = require("http")

// const app = http.createServer((req, res) => {
//     res.writeHead(200, {"Content-Type" : "text/plain"})
//     res.end("Hello world")
// })

// const Port = 5000;

// app.listen(Port, () => {
//     console.log(`Server running on port http://localhost:${Port}`)
// })


// using express framework
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const Port = process.env.PORT || 5000;

app.use(cors());

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-1-17T17:30:31.098Z",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      date: "2022-1-17T18:39:34.091Z",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-1-17T19:20:14.298Z",
      important: true,
    },
  ];

app.get("/", (req, res) => {
    res.send("hello world")
});

app.get("/notes", (req, res) => {
    // res.status(200).json(notes)
    res.json(notes)
});

app.get("/notes/:id", (req, res) => {
  const currentId = Number(req.params.id);
  const thisNote = notes.find((note) => note.id === currentId)

  if(thisNote) res.status(200).json(thisNote)
  else res.status(404).json({err : "404 not found", msg : `there is no note with ${currentId}`})
})

app.delete("/notes/:id", (req, res) => {
  const currentId = Number(req.params.id);
  notes = notes.filter((note) => note.id !== currentId)

  res.status(204).json({msg : "note successfully deleted"})

  // res.status(204).end();
})

app.listen(Port, () => {
    console.log(`Server running on port http://localhost:${Port}`)
});


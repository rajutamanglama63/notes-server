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

const Note = require("./models/noteSchema");

dotenv.config();

const app = express();

const Port = process.env.PORT || 3001;

// all this use things are middlewares

// we have to use middleware in server code where we need to pass callback function which goes like - express.static("build") to run
// both react app and server in same url --- before doing it we have to create build folder by commanding "npm run build"
// in react app and it should be copied down to server's root directory.

// what all this particular middleware does is check for executable file and execute or render it on browser before
// checking for other codes in backend server
app.use(express.static("build"));
app.use(cors());
app.use(express.json());

// middleware concept in action
app.use((req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("---");

  next();
});

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy to learn",
//       date: "2022-1-17T17:30:31.098Z",
//       important: true,
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       date: "2022-1-17T18:39:34.091Z",
//       important: false,
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2022-1-17T19:20:14.298Z",
//       important: true,
//     },
//   ];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/notes", (req, res, next) => {
  // USING ARRAY AS DUMMY DB
  // res.status(200).json(notes)

  // USING MONGO AS DB
  Note.find()
    .then((allNotes) => {
      res.status(200).json(allNotes);
    })
    .catch((err) => next(err));
});

app.get("/notes/:id", (req, res) => {
  const currentId = Number(req.params.id);
  const thisNote = notes.find((note) => note.id === currentId);

  if (thisNote) res.status(200).json(thisNote);
  else
    res.status(404).json({
      err: "404 not found",
      msg: `there is no note with ${currentId}`,
    });
});

app.delete("/notes/:id", (req, res, next) => {
  // USING ARRAY AS DUMMY DB

  // const currentId = Number(req.params.id);
  // notes = notes.filter((note) => note.id !== currentId);

  // res.status(204).json({ msg: "note successfully deleted" });

  // res.status(204).end();

  // USING MONGO AS DB
  const id = req.params.id;

  Note.findByIdAndRemove(id)
    .then((result) => {
      res.status(200).json({
        success: "Successfully deleted",
        result,
      });
    })
    .catch((err) => next(err));
});

app.put("/notes/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("l", id);

  const noteToUpdate = {
    content: req.body.content,
    important: req.body.important,
  };

  Note.findByIdAndUpdate(id, noteToUpdate, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      res.status(200).json({ success: "Successfully updated", updatedNote });
    })
    .catch((err) => next(err));
});

app.post("/notes", (req, res, next) => {
  // USING STATIC ARRAY AS DB
  // const newContent = req.body;
  // newContent.id = notes.length + 1;
  // newContent.date = new Date()

  // notes.push(newContent)

  // res.status(204).json(newContent)

  // USING MONGO AS DB
  const newNote = new Note({
    content: req.body.content,
    important: req.body.important || false,
    date: req.body.date,
  });

  newNote
    .save()
    .then((savedNewNote) => {
      res.status(200).json(savedNewNote);
    })
    .catch((err) => next(err));
});

// if we try to access invalid route this middleware will responsible to handle it properly
app.use((req, res, next) => {
  res.status(404).send("<h1>No such routes detected.</h1>");
});

const errHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ err: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ err: err.message });
  }

  next(err);
};

app.use(errHandler);

app.listen(Port, () => {
  console.log(`Server running on port http://localhost:${Port}`);
});

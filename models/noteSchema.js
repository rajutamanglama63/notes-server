const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 5,
  },
  date: {
    type: Date,
    required: true,
  },
  important: {
    type: Boolean,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

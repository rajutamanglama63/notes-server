const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then((result) => {
    console.log("MongoDB connection established...");
  })
  .catch((err) => {
    console.log(err);
  });

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

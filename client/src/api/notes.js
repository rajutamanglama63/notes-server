import axios from "axios";

// const url = "http://localhost:3001/notes";
// now after running both frontend and backend together we can manipulate url like this --
const url = "/notes";

const getAllNotesObj = () => {
  const req = axios.get(url);
  return req.then((res) => res.data);
};

const postNoteObj = (newNoteObj) => {
  const req = axios.post(url, newNoteObj);
  return req.then((res) => res.data);
};

const updateNoteObj = (id, noteObj) => {
  const req = axios.put(`${url}/${id}`, noteObj);
  return req.then((res) => res.data);
};

export default {
  getAllNotesObj,
  postNoteObj,
  updateNoteObj,
};

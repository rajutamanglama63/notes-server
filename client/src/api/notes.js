import axios from "axios";

const url = "http://localhost:5000/notes";

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

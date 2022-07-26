import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import axios from "axios";
import App from "./App";

// const notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true,
//   },
// ];

// const res = axios.get("http://localhost:5000/notes")
// console.log(res)  ------> this gives the promise object

// res.then((result) => {
//   console.log(result.data)
// }) -------------->  this will be execute only after web api completed successfully

// res.catch((err) => {
// console.log(err.message)
// }) ---------> if there is issue or bug in our url or i mean there is invalid url it help to handle that error tactfully

// this code below runs perfectly when we send props to App component
// axios
//   .get("http://localhost:5000/notes")
//   .then((response) => {
//     console.dir(response);
//     const root = ReactDOM.createRoot(document.getElementById("root"));
//     root.render(
//       <React.StrictMode>
//         <App notes={response.data} />
//       </React.StrictMode>
//     );
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

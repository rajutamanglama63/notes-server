// not using express framework
const http = require("http")

const app = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type" : "text/plain"})
    res.end("Hello world")
})

const Port = 5000;

app.listen(Port, () => {
    console.log(`Server running on port http://localhost:${Port}`)
})


// using express framework
// const express = require("express");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();

// const Port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//     res.send("hello world")
// });


// app.listen(Port, () => {
//     console.log(`Server running on port http://localhost:${Port}`)
// });


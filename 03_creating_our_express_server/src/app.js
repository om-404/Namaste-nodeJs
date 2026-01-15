// creating server

const express = require('express');

const app = express();

// arrow function inside the app.use is request handler
app.use((req, res) => {
    res.send("hello from the server !")
})
// localhost:3000, localhost:3000/adjn, localhost:3000/abc/about etc. - response will be - "hello from the server !"
// whatever the request come, server response "hello from the server !"

// server is listening on port 3000
app.listen(3000, () => {
    console.log("server is running on port 3000 !");
})
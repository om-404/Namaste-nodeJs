// creating server

const express = require('express');

const app = express();

// <----------------------------- ROUTES ----------------------------->

// <----------------------------- case - 01 ----------------------------->

// app.use('/', (req, res) => {
//     res.send("this is home page...");
// })

// app.use('/about', (req, res) => {
//     res.send("this is about page...");
// })

// app.use('/intro', (req, res) => {
//     res.send("this is intro page...");
// })

// for request -> '/' -> res = this is home page...
// for request -> '/about' -> res = this is home page...
// for request -> '/intro' -> res = this is home page...
// for request -> '/intro/abc' -> res = this is home page...
// for request -> '/<anything>' -> res = this is home page...

// <----------------------------- case - 02 ----------------------------->

// app.use('/about', (req, res) => {
//     res.send("this is about page...");
// })

// app.use('/intro', (req, res) => {
//     res.send("this is intro page...");
// })

// for request -> '/' -> res = Cannot GET /
// for request -> '/about' -> res = this is about page...
// for request -> '/about/abc' -> res = this is about page...
// for request -> '/aboutabc' -> res = Cannot GET /aboutabc
// for request -> '/intro' -> res = this is intro page...
// for request -> '/intro/abc' -> res = this is intro page...

// <----------------------------- case - 03 ----------------------------->

// app.use('/about', (req, res) => {
//     res.send("this is about page...");
// })

// app.use('/about/1', (req, res) => {
//     res.send("this is about - one page...");
// })

// for request -> '/about' -> res = this is about page...
// for request -> '/about/1' -> res = this is about page...

// <----------------------------- case - 04 ----------------------------->

app.use('/about/1', (req, res) => {
    res.send("this is about - one page...");
})

app.use('/about', (req, res) => {
    res.send("this is about page...");
})

app.use('/', (req, res) => {
    res.send("this is home page...");
})


// for request -> '/about' -> res = this is about page...
// for request -> '/about/1' -> res = this is about - one page...
// // for request -> '/aboutpqr' -> res = this is home page...




app.listen(3000, () => {
    console.log("server is running on port 3000 !");
})
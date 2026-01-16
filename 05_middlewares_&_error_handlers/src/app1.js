// creating server

const express = require('express');

const app = express();

// <----------------------------- case - 01 ----------------------------->

app.use('/user1', (req, res) => {
    // this is route handler
    res.send("this is route handler 1");
})

// <----------------------------- case - 02 - multiple route handler ----------------------------->

// app.use('/user2', 
//     (req, res)=>{
//         res.send("this is route handler 1")
//     }, 
//     (req, res) => {
//         res.send("this is route handler 2")
//     }
// )
// outuput - this is route handler 1

// <----------------------------- case - 03 - multiple route handler ----------------------------->

// app.use('/user2', 
//     (req, res)=>{
        
//     }, 
//     (req, res) => {
//         res.send("this is route handler 2");
//     }
// )
// outuput - no o/p only loading

// <----------------------------- case - 04 - next() ----------------------------->

// app.use('/user2', 
//     (req, res, next)=>{
//         console.log("route handler-1")
//         res.send("this is route handler 1");
//         next();
//     }, 
//     (req, res) => {
//         console.log("route handler-2")
//         res.send("this is route handler 2");
//     }
// )
// response - this is route handler 1
// o/p 
// route handler-1
// route handler-2
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// give error - after the 1st reponse is send, tcp connection get closed, now no more response can be send

// <----------------------------- case - 05 - next() ----------------------------->

// app.use('/user2', 
//     (req, res, next)=>{
//         console.log("route handler-1")
//         next();
//         res.send("this is route handler 1");
        
//     }, 
//     (req, res) => {
//         console.log("route handler-2")
//         res.send("this is route handler 2");
//     }
// )
// response - this is route handler 2
// o/p 
// route handler-1
// route handler-2
// then response will be send  - this is route handler 2
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// give error - after the 1st reponse is send, tcp connection get closed, now no more response can be send

// <----------------------------- case - 06 - next() ----------------------------->

// app.use('/user2', 
//     (req, res, next)=>{
//         console.log("route handler-1")
//         // res.send("this is route handler 1");
//         next();
//     }, 
//     (req, res) => {
//         console.log("route handler-2")
//         res.send("this is route handler 2");
//     }
// )
// response - this is route handler 2


// <----------------------------- case - 07 - next() - miscellaneous ----------------------------->

// app.use('/user2', 
//     (req, res, next)=>{
//         console.log("route handler-1")
//         // res.send("this is route handler 1");
//         next();
//     }, 
//     (req, res, next) => {
//         console.log("route handler-2")
//         // res.send("this is route handler 2");
//         next();
//     },
//     (req, res, next) => {
//         console.log("route handler-3")
//         // res.send("this is route handler 3");
//         next();
//     },
//     (req, res, next) => {
//         console.log("route handler-4")
//         // res.send("this is route handler 4");
//         next();
//     }, 
//     (req, res, next) => {
//         console.log("route handler-5")
//         // res.send("this is route handler 5");
//         next();
//     }
// )
// output - 
// route handler-1
// route handler-2
// route handler-3
// route handler-4
// route handler-5

// response - error - <pre>Cannot GET /user2</pre>
// because the next() is expecting another the route handler for the route /user2

// <----------------------------- case - 08 - next() - independent route handler ----------------------------->

app.use('/user2', 
    (req, res, next)=>{
        console.log("route handler-1")
        // res.send("this is route handler 1");
        next();
    }
)
app.use('/user2', 
    (req, res, next)=>{
        console.log("route handler-2")
        res.send("this is route handler 2");
        next();
    }
)

// response - this is route handler 2



app.listen(3000, () => {
    console.log("server is running on port 3000 !");
})
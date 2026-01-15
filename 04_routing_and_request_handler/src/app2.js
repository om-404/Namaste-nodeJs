const express = require('express')

const app = express();

// <----------------------------- HTTP METHODS ----------------------------->

// <----------------------------- case - 01 ----------------------------->

// // @ this will only handle get call to /user 
// app.get('/user', (req, res) => {
//     res.send({firstName: "om", lastName: "sonawale"});
// })

// // @ this will only handle post call to /user 
// app.post('/user', (req, res) => {
//     // data saving to database logic
//     res.send("data saved to the database successfully !");
// })

// // @ this will only handle delete call to /user 
// app.delete('/user', (req, res)=> {
//     res.send("data deleted successfully !");
// })

// // @ this will match all the http method API calls to /test
// app.use('/test', (req, res) => {
//     res.send("hello from the server !");
// })

// <----------------------------- case - 02 - regex ----------------------------->

// app.get("/ab?c", (req, res) => {
//     res.send({firstName: "Om", lastName: "sonawale"});
// })

// app.get(/^\/ab?c$/, (req, res) => {
//   res.send({ firstName: "Om", lastName: "sonawale" });
// });

// <----------------------------- case - 03 - query and params ----------------------------->

// reading query parameter - using query
// app.get('/user', (req, res) => {
//     console.log(req.query);
//     res.send({firstName: "om", lastName: "sonawale"});
// })

// making dynamic routing - using params
app.get('/user/:id/:name/:password', (req, res) => {
    console.log(req.params);
    res.send({firstName: "om", lastName: "sonawale"});
})

app.listen(5173, ()=>{
    console.log("server is running on port 5173 !");
})
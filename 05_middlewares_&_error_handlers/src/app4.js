const express = require('express')
const {adminAuth, userAuth} = require('./middlewares/auth.js')

const app = express();

// <----------------------------- case - 01 - error route handler ----------------------------->

app.get('/getUserData', (req, res)=>{
    try {
        // logic of db call and get user data
        throw new Error("abc");
        res.send("user data send");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.use('/', (err, req, res, next)=>{
    if(err)
        // log your error
        res.status(500).send("something went wrong ...");
})




// <----------------------------- case - 02 - try catch ----------------------------->

app.get('/getUserData', (req, res)=>{
    // logic of db call and get user data
    throw new Error("abc");
    res.send("user data send");
})

app.use('/', (err, req, res, next)=>{
    if(err)
        // log your error
        res.status(500).send("something went wrong ...");
})

app.listen(7777, ()=>{
    console.log("server is running on port 7777 !");
})
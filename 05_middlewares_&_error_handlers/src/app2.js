const express = require('express')

const app = express();

app.use('/admin', (req, res, next)=>{
    console.log("this is auth route handler !");
    const token = "abc";
    const isAuthorized = "abc" === token;

    if(!isAuthorized){
        res.status(201).send("unauthorized - invalid token !");
    }else{
        next();
    }
})

app.use('/user', (req, res, next)=>{
    console.log("this is auth route handler !");
    const token = "abc";
    const isAuthorized = "abc" === token;

    if(!isAuthorized){
        res.status(201).send("unauthorized - invalid token !");
    }else{
        next();
    }
})

app.get('/admin/data', (req, res)=>{
    console.log("this is data part !");
    res.send("data get successfully !");
})

app.listen(5173, ()=>{
    console.log("server is running on port 5173 !");
})
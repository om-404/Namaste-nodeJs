const express = require('express')
const {adminAuth, userAuth} = require('./middlewares/auth.js')

const app = express();

app.use('/admin', adminAuth);

app.get('/admin/data', (req, res)=>{
    console.log("this is data part !");
    res.send("admin data get successfully !");
})

app.get('/user/data', userAuth, (req, res)=>{
    console.log("this is data part !");
    res.send("user data get successfully !");
})

app.listen(7777, ()=>{
    console.log("server is running on port 7777 !");
})
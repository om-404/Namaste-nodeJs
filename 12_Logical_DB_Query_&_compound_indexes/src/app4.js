const express = require('express')
const {adminAuth, userAuth} = require('./middlewares/auth.js')

const app = express();



app.listen(7777, ()=>{
    console.log("server is running on port 7777 !");
})
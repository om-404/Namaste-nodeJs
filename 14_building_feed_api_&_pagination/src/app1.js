const express = require('express');
const {connectDb} = require('./config/database')
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}
));

app.use(express.json());

app.use(cookieParser());





const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const requestRouter = require('./routes/request.js');
const userRouter = require('./routes/user.js');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

connectDb().then(()=>{
    console.log("Database connection establish-2 ...");
    app.listen(3000, ()=>{
        console.log("server is running on port 3000 !");
    })
}).then(()=>{
    console.log("error occured database connot be connected - 2 !")
})




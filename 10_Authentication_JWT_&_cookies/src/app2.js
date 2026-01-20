const express = require('express');
const {connectDb} = require('./config/database')
const UserModel = require('./models/user.js')
const {validateSignupData} = require('./utils/validation.js')
const bcrypt = require('bcrypt')
const validator = require('validator');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const {userAuth} = require("./middlewares/auth.js");



const app = express();

// a middleware which convert json object to js object
app.use(express.json());
// this app.use() will run on every request and routes

app.use(cookieParser());

app.post("/signup", async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        // validation of data
        validateSignupData(req);

        // encrypt the password
        const {password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10); 
        console.log(hashPassword);


        // creating new instance of the userModel model
        // const user = new UserModel(req.body); // this is bad practice to directly pass the req.body

        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword

        })

        // saving the user
        await user.save();
        res.send("user added successfully !");
        
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
    
})

app.post("/login", async (req, res) => {    
    const {email, password} = req.body;

    try {
            if(!validator.isEmail(email)){
                throw new Error("enter valid email !");
            }

            // checking if user exist in the database
            const user = await UserModel.findOne({email: email});
            if(!user){
                throw new Error("this user doesn't exist or Invalid credentials");
            }

            // checking if the password is correct or not
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
                throw new Error("Ivalid password or Invalid credentials");
            }

            // after the password is valid - we generate token and cookie
            
            // 1. Create a JWT token

            const token = await jwt.sign({_id: user._id}, "DEVtinder@#$SecretKeY", {expiresIn: "7d"});
            // console.log(token);

            // 2. add the token to cookie and send cookie to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8*3600000)
            });

            res.send("login successfull !");
            // res.send(user);
            } catch (error) {
                res.status(400).send("ERROR : " + error.message);
            }
        
})

app.get("/profile", userAuth, async (req, res) => {

    try {
        const user = req.user;
        if(!user){
            res.send("user doesn't exist !");
        }

        res.send(user);

        } catch (error) {
            res.status(400).send("ERROR : " + error.message);
        }
})

app.get("/user", async (req, res) => {
    const userEmail = req.body.email;

    try {
        const users = await UserModel.find({email: userEmail}); // this will give array of user with this email
        if(users.length === 0){
            res.status(404).send("user not found !");
        }
        else{
            res.send(users);
        }
    } catch (error) {
        res.status(400).send("something went wrong : " + error.message);
    }
})






connectDb().then(()=>{
    console.log("Database connection establish-2 ...");
    app.listen(3000, ()=>{
        console.log("server is running on port 3000 !");
    })
}).then(()=>{
    console.log("error occured database connot be connected - 2 !")
})




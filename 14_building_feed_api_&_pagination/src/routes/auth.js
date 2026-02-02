const express = require('express');
const authRouter = express.Router();
const {validateSignupData} = require('../utils/validation.js');
const bcrypt = require('bcrypt')
const validator = require('validator');
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.js');


authRouter.post("/signup", async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        // validation of data
        validateSignupData(req);

        // encrypt the password
        const {password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10); 

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

authRouter.post("/login", async (req, res) => {    
    const {email, password} = req.body;

    try {
            if(!validator.isEmail(email)){
                throw new Error("enter valid email !");
            }

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

            res.send(user);
            // res.send(user);
            } catch (error) {
                res.status(400).send("ERROR : " + error.message);
            }
        
})

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });

    res.send("logout successfull !!");
})


module.exports = authRouter;
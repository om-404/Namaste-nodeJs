const express = require('express');
const {connectDb} = require('./config/database')
const UserModel = require('./models/user.js')
const {validateSignupData} = require('./utils/validation.js')
const bcrypt = require('bcrypt')
const validator = require('validator');


const app = express();

// a middleware which convert json object to js object
app.use(express.json());
// this app.use() will run on every request and routes

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

            res.send("login successfull !");
            // res.send(user);
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

app.get("/feed", async (req, res) => {
    try {
        const users = await UserModel.find({}); // this will give all the documents from DB
        res.send(users);
    } catch (error) {
        res.status(400).send("something went wrong : " + error.message);
    }
})

app.delete("/delete", async (req, res) => {
    const userId = req.body.userId;

    try {
        await UserModel.findByIdAndDelete(userId);
        res.send("user deleted succesfully !");
    } catch (error) {
        res.status(400).send("something went wrong : " + error.message);
    }
})

app.patch("/user/:userId", async(req, res) => {

    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            "userId",
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills"
        ];

        const isAllowedUpdate = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        // validation - 1
        if(!isAllowedUpdate){
            throw new Error("Update not allowed !");
        }

        // validation - 2
        if(data?.skills.length > 10){
            throw new Error("Skills cannot be  more than 10")
        }
        await UserModel.findByIdAndUpdate({_id:userId}, data, {
            runValidators: true,
            returnDocument: "after"
        });
        res.send("user updated successfully !");

    } catch (error) {
        res.status(400).send("something went wrong : " + error.message);

    }
})



// best practice to establish the db connection and starting the server
connectDb().then(()=>{
    console.log("Database connection establish-2 ...");
    app.listen(3000, ()=>{
        console.log("server is running on port 3000 !");
    })
}).then(()=>{
    console.log("error occured database connot be connected - 2 !")
})




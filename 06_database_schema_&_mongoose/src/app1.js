const express = require('express');
const {connectDb} = require('./config/database')
const UserModel = require('./models/user.js')


const app = express();

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "om",
        lastName: "sonawale",
        email: "om123@gmai.com",
        age: 20,
        gender: "male",
    }   

    try {
        // creating new instance of the userModel model
        const user = new UserModel(userObj);

        // saving the user
        await user.save();
        res.send("user added successfully !");
        
    } catch (error) {
        res.status(400).send("error in saving the use " + error.message);
    }
    
})

// best practice to establish the db connection and starting the server
connectDb().then(()=>{
    console.log("Database connection establish ...");
    app.listen(3000, ()=>{
        console.log("server is running on port 3000 !");
    })
}).then(()=>{
    console.log("error occured database connot be connected !")
})




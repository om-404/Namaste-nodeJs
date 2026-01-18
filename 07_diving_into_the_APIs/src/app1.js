const express = require('express');
const {connectDb} = require('./config/database')
const UserModel = require('./models/user.js')


const app = express();

// a middleware which convert json object to js object
app.use(express.json());
// this app.use() will run on every request and routes

app.post("/signup", async (req, res) => {
    
    // console.log(req);
    // console.log(req.body);

    try {
        // creating new instance of the userModel model
        const user = new UserModel(req.body);

        // saving the user
        await user.save();
        res.send("user added successfully !");
        
    } catch (error) {
        res.status(400).send("error in saving the use " + error.message);
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

app.patch("/user", async(req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        await UserModel.findByIdAndUpdate({_id:userId}, data);
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




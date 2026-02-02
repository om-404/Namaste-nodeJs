const express = require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequestModel = require('../models/connectionRequest');
const UserModel = require('../models/user');

const userRouter = express.Router();

// get all pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
    try {

        const loggedInUser = req.user;
        const connectionRequests = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"]);

        res.json({
            message: "Data fetched successfully !",
            data: connectionRequests
        })
        
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});


const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/connections", userAuth, async (req, res)=>{
    try {

        const loggedInUser = req.user;

        const connectionRequests = await connectionRequestModel.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })

        

        res.json({
            message: "Data fetched successfully !",
            data,
        })
        
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});

userRouter.get("/feed", userAuth, async (req, res)=>{
    try {

        // user should see all the cards except 
        // 1. his own card
        // 2. his connections
        // 3. ignored people
        // 4. already sent the connection request

        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50 ? 50 : limit;
        const skip = (page-1) * limit;

        // find all connection requests (sent + received)

        const connectionRequests = await connectionRequestModel.find({
            $or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]
        }).select("fromUserId toUserId status"); // after completing the project remove the status 

        const hideUserFromFeed = new Set();

        connectionRequests.forEach(connReq => {
            hideUserFromFeed.add(connReq.fromUserId.toString());
            hideUserFromFeed.add(connReq.toUserId.toString());
        });

        // console.log(hideUserFromFeed);

        const users = await UserModel.find({
            $and: [
                {_id: { $nin: Array.from(hideUserFromFeed) }},
                {_id: { $ne: loggedInUser._id }}
            ]
            
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        // this statement means - give all the users from the database excluding users in hideUserFromFeed array and its own profile

        // console.log(users);




        // res.send(connectionRequests);
        res.send(users);
        
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});




module.exports = userRouter;
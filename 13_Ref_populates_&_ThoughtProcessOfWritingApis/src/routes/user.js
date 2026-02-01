const express = require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequestModel = require('../models/connectionRequest');

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




module.exports = userRouter;
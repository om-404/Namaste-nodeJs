const express = require('express');

const requestRouter = express.Router();

const {userAuth} = require('../middlewares/auth.js');
const connectionRequestModel = require('../models/connectionRequest.js');
const UserModel = require('../models/user.js');



requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    
    try {

        const fromUserId = req.user._id; // this is the loggedIn user
        
        const toUserId = req.params.toUserId;

        const status = req.params.status

        const allowedStatus = ["interested", "ignored"];


        if(!allowedStatus.includes(status)){
            return res 
                .status(400)
                .json({message: "Invalid status type " + status});
        }

        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId},
            ],
        });

        if(existingConnectionRequest){
            return res
                .status(400)
                .send({message: "Connection request already exists !"});
        }

        const toUser = await UserModel.findById(toUserId);

        if(!toUser){
            return res.status(404).json({message: "user not found !"});
        }
        
        const connectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        res.json({
            message: "connection requet sent successfully !",
            data,
        })


    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res) => {
    

    try {
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        // validate status

        const allowedStatus = ["accepted", "rejected"];

        if(!allowedStatus.includes(status)){
            return res.status(400),json({message: "Status not allowed !"});
        }

        // request Id should be valid(means it is present in the db or not)
        const connectionRequest = await connectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        })

        if(!connectionRequest){
            return res
                .status(404)
                .json({message: "connection request not found !"});

        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({
            message: "connection request " + status, data
        })

        
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }


})

module.exports = requestRouter;
const express = require('express');

const requestRouter = express.Router();

const {userAuth} = require('../middlewares/auth.js');
const connectionRequestModel = require('../models/connectionRequest.js');
const UserModel = require('../models/user.js');



requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    
    try {

        // case-01 - 1st improvement

        // const fromUserId = req.user._id; // this is the loggedIn user
        
        // const toUserId = req.params.toUserId;

        // const status = req.params.status
        
        // const connectionRequest = new connectionRequestModel({
        //     fromUserId,
        //     toUserId,
        //     status
        // })

        // const data = await connectionRequest.save();

        // res.json({
        //     message: "connection requet sent successfully !",
        //     data,
        // })

        // case-02 - 1st improvement - checking is connection valid or not

        // const fromUserId = req.user._id; // this is the loggedIn user
        
        // const toUserId = req.params.toUserId;

        // const status = req.params.status

        // const allowedStatus = ["interested", "ignored"];

        // if(!allowedStatus.includes(status)){
        //     return res 
        //         .status(400)
        //         .json({message: "Invalid status type " + status});
        // }
        
        // const connectionRequest = new connectionRequestModel({
        //     fromUserId,
        //     toUserId,
        //     status
        // })

        // const data = await connectionRequest.save();

        // res.json({
        //     message: "connection requet sent successfully !",
        //     data,
        // })


        // case-03 - 1st improvement - checking is connection valid or not


        // const fromUserId = req.user._id; // this is the loggedIn user
        
        // const toUserId = req.params.toUserId;

        // const status = req.params.status

        // const allowedStatus = ["interested", "ignored"];


        // if(!allowedStatus.includes(status)){
        //     return res 
        //         .status(400)
        //         .json({message: "Invalid status type " + status});
        // }

        // console.log("jnsdkjvn");

        // const existingConnectionRequest = await connectionRequestModel.findOne({
        //     $or: [
        //         {fromUserId, toUserId},
        //         {fromUserId: toUserId, toUserId: fromUserId},
        //     ],
        // });

        // console.log("abc123");

        // if(existingConnectionRequest){
        //     return res
        //         .status(400)
        //         .send({message: "Connection request already exists !"});
        // }
        
        // const connectionRequest = new connectionRequestModel({
        //     fromUserId,
        //     toUserId,
        //     status
        // })

        // const data = await connectionRequest.save();

        // res.json({
        //     message: "connection requet sent successfully !",
        //     data,
        // })


        // case-03 - 1st improvement - checking if my toUserId present in the database or not


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

module.exports = requestRouter;
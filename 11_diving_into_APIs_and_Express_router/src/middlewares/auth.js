const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.js');

const adminAuth = (req, res, next)=>{
    console.log("this is auth route handler !");
    const token = "abc";
    const isAuthorized = "abc123" === token;

    if(!isAuthorized){
        res.status(201).send("admin-unauthorized - invalid token !");
    }else{
        next();
    }
}

const userAuth = async(req, res, next)=>{
    
    // reading cookies
    try {
        const cookies = req.cookies;
        const {token} = cookies;

        if(!token){
            throw new Error("Invalid token !");
        }

        const decodedData = await jwt.verify(token, "DEVtinder@#$SecretKeY");

        const {_id} = decodedData;

        const user = await UserModel.findOne({_id: _id});

        if(!user){
            throw new Error("user doesn not exist !");
        }

        req.user = user; // attaching user to request

        next();

    } catch (error) {
        res.status(400).send("ERROR : ", error.message);
    }

}

module.exports = {adminAuth, userAuth};
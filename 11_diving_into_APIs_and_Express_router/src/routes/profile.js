const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");

profileRouter.get("/profile", userAuth, async (req, res) => {

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

module.exports = profileRouter;
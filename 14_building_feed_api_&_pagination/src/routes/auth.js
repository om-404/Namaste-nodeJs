// const express = require("express");
// const authRouter = express.Router();
// const { validateSignupData } = require("../utils/validation.js");
// const bcrypt = require("bcrypt");
// const validator = require("validator");
// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/user.js");

// authRouter.post("/signup", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     // validation of data
//     validateSignupData(req);

//     // encrypt the password
//     const { password } = req.body;
//     const hashPassword = await bcrypt.hash(password, 10);

//     const user = new UserModel({
//       firstName,
//       lastName,
//       email,
//       password: hashPassword,
//     });

//     // saving the user
//     const savedUser =  await user.save();
//     res.json({message: "user added successfully !", data: savedUser})
//   } catch (error) {
//     res.status(400).send("ERROR : " + error.message);
//   }
// });

// authRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!validator.isEmail(email)) {
//       throw new Error("enter valid email !");
//     }

//     const user = await UserModel.findOne({ email: email });
//     if (!user) {
//       throw new Error("this user doesn't exist or Invalid credentials");
//     }

//     const isPasswordValid = await user.validatePassword(password);
    

//     // 2. add the token to cookie and send cookie to the user
//     res.cookie("token", token, {
//       expires: new Date(Date.now() + 8 * 3600000),
//       httpOnly: true,
//       sameSite: "lax",
//     });

//     res.send(user);
//     // res.send(user);
//   } catch (error) {
//     res.status(400).send("ERROR : " + error.message);
//   }
// });

// authRouter.post("/logout", async (req, res) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
    
//   });

//   res.send("logout successfull !!");
// });

// module.exports = authRouter;

const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.js");

// ================= SIGNUP =================
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    // 🔥 check duplicate email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // 🔐 hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const savedUser = await user.save();

    // 🔥 generate token
    const token = jwt.sign(
      { _id: savedUser._id },
      "DEVtinder@#$SecretKeY",
      { expiresIn: "7d" }
    );

    // 🍪 set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({ user: savedUser });

  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// ================= LOGIN =================
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Enter valid email");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // const isPasswordValid = await user.validatePassword(password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // 🔥 generate token
    const token = jwt.sign(
      { _id: user._id },
      "DEVtinder@#$SecretKeY",
      { expiresIn: "7d" }
    );

    // 🍪 set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({ user });

  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// ================= LOGOUT =================
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    expires: new Date(Date.now()),
  });

  res.send("Logout successful!");
});

module.exports = authRouter;

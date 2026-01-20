const mongoose = require('mongoose');
const validator = require('validator');

// user schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter valid email address " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("enter strong password.");
            }
        }
    },
    age: {
        type: Number,
        min : 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid !");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter valid URL");
            }
        }
        
    },
    about: {
        type: String,
        default: "This is the default about the user !",
    },
    skills: {
        type: [String]
    }
},
{
    timestamps: true,
});


    // creating model
    const UserModel =  mongoose.model("User", userSchema);

    module.exports = UserModel;
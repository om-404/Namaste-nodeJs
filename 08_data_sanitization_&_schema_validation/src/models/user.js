const mongoose = require('mongoose');

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
    },
    password: {
        type: String,
        required: true,
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
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
    },
    about: {
        type: String,
        default: "This is the default about the user !"
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
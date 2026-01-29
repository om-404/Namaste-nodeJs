const validator = require('validator')

const validateSignupData = (req) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("firstName and lastName is required !");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Enter the valid email !");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter the strong password !");
    } 
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => 
        allowedEditFields.includes(field)
    )

    return isEditAllowed;
}

module.exports = {
    validateSignupData,
    validateEditProfileData
}
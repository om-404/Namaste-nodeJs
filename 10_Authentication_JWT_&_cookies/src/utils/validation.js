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

module.exports = {
    validateSignupData
}
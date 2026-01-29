const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect("");
}

connectDb().then(() => {
    console.log("Database connection established-1 ... ");
}).catch((err)=>{
    console.log("error occured database connot be connected - 1 !");
})

// connectDb it is a function which returns a promise
// connectDb returns a promise then then function is used to handle the promise

module.exports = {
    connectDb
}

 
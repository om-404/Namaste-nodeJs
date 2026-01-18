const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect("mongodb+srv://<project_name>:<password>@cluster0.rlmwza3.mongodb.net/<database_name>?retryWrites=true&w=majority&appName=Cluster0");
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

 
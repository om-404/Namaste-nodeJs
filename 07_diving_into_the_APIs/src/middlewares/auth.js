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

const userAuth = (req, res, next)=>{
    console.log("this is user route handler !");
    const token = "123";
    const isAuthorized = "123" === token;

    if(!isAuthorized){
        res.status(201).send("user-unauthorized - invalid token !");
    }else{
        next();
    }
}

module.exports = {adminAuth, userAuth};
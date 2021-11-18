const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model")

exports.hashPassword = async (req,res,next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8) ;//the 8 is the amount of loop through security
        //save password back as rec.body as the controller folder is looking for rec.body
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ messages: "check server error logs" })
    }
}

//finds the user first, checks the password, if that is correct, sends user over into the req object and then calls next in the controller- below info//


exports.comparePasswords = async (req,res,next) => {
    try {
        const user = await User.findOne({ email: req.body.email }) //rec.body contains both email 
        //and password so we cant use that to just find user and to find hashPassword
        //hashed password is stored in the mongoses db and have access to. 
        //we have to first find the user to find the password and 
        //to see if the password matches

        if (await bcrypt.compare(req.body.password, user.password)) {
            req.user = user 
            next();

        // const comparisonBool = await bcrypt.compare(req.body.password, user.password)// user.password is the hashed password and that is stored in db
        //this will compare the algorithm and if they match, it will come back as true
        //Bool is come back as either true or false for comparing
        //to check if the hashPassword and actual password is the same and to compare.
        // if (comparisonBool) { 
        //     req.user = user // adding the user variable to req hence req.user
        //     next();
        
    } else {
            throw new Error; //it is an empty error. default to catch block below if it fails
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "check server error logs" });
    }
}


exports.tokenAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        // const noBearerToken = token.replace("Bearer ", ""); // replacing the word in token 'bearer' with empty string 
        // console.log(tokenObj);
        const tokenObj = jwt.verify(token, process.env.SECRET) //decode the token
        const user = await User.findOne({ _id: tokenObj._id });
        req.user = user;
        if (!req.user) {   //if req.user doesnt exist, throw error
            throw new Error();
        }
        next();
        //we need to work on how to access the token, how to use that token to search the db, and give req.user an actual value.
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "check server logs" })
    }
} 
const User = require("./user.model");

//create
exports.addUser = async (req,res) => {  //client and server is seperate . Async is it deals with db
    //has the request object and response object (res,req)
    //req has all info sent to the web server
    //res has all info that i can send back
    try {
        const newUser = new User(req.body);// rec.body us the actual JSON body that i send to the back end
        const token = await newUser.generateAuthToken(); //own define mongose method. token is specific to the user created. the token is not saved, as shown below, just the new user. never store token in a db, as if db gets hacked, tokens will be available and have users detail
        await newUser.save();// save it
        res.status(200).send({ messages: "success", newUser, token });// sent as a js object

    } catch (error) {
        console.log(error)
        res
        .status(418)
        .send({ message: "something went wrong, check server logs" }) // since server and client are seperate, 
        //we need the server to show if it does not work
    }
}  //asyn: going out of the application for it to work


//read
exports.logIn = async (req,res) => {
    try {
        const token = await req.user.generateAuthToken();
        res.status(200).send({user: req.user, token}); //finding a user 
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "check server logs" })
    }
}


exports.deleteUser = async (req,res) => {
    try {
        await User.deleteOne(req.params.username)
        res.send('successfully delete') //important.   
    } catch (error) {
        console.log(error)
        res
        .status(418)
        .send({ message: "something went wrong, check server logs" }) // since server and client are seperate, 
        //we need the server to show if it does not work 
    }
}



exports.updateUser = async (req,res) => {
    try {
       await User.updateOne({username: req.body.username}, {$set: {email: req.body.email}})// searching
        res.send('sucessfully updated')
    } catch (error) {
        console.log(error)
        res
        .status(418)
        .send({ message: "something went wrong, check server logs" }) // since server and client are seperate, 
        //we need the server to show if it does not work 
    }
}


 

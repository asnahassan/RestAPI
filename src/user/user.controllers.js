const User = require("./user.model");
exports.addUser = async (req,res) => {  //client and server is seperate . Async is it deals with db
    //has the request object and response object (res,req)
    //req has all info sent to the web server
    //res has all info that i can send back
    try {
        const newUser = new User(req.body);// rec.body us the actual JSON body that i send to the back end
        await newUser.save();// save it
        res.status(200).send({ messages: "success"});// sent as a js object
    } catch (error) {
        console.log(error)
        res
        .status(418)
        .send({ message: "something went wrong, check server logs" }) // since server and client are seperate, 
        //we need the server to show if it does not work
    }
}  //asyn: going out of the application for it to work

exports.deleteUser = async (req,res) => {
    try {
        res.send('Got a DELETE request at /user')
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
        res.send('POST request to homepage')
    } catch (error) {
        console.log(error)
        res
        .status(418)
        .send({ message: "something went wrong, check server logs" }) // since server and client are seperate, 
        //we need the server to show if it does not work 
    }
}


 

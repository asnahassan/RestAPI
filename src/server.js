require("./db/connection"); //connection is open the entire time this app is running
const express = require("express") //npm library to deal with routing
const cors = require("cors") //npm library for sharing
const userRouter = require("./user/user.routes") //pull in router from user.routes
const app = express(); //have to assign express function to a const in order to access it with dotnotation
const port = process.env.PORT || 5000; //define a port or 5000 if i am in a dev space


app.use(express.json());
//convert from json to javascirpt object. 
//recieve as json and convert js object and then sending back,
// it will cinvert it back to json
//json itself is a method therefore need paranteses ie ()


app.use(cors()); 
//sharing enabled 

app.use(userRouter);
//comes from route file

app.get("/health", (req,res) => {
    res.send({ messages: "Servers up" })
});

//basic get request , "/health" is the endpoin. 
//the (req,res) with the function is the controller to send message the the server is up
//i can check it on any platform that can make a GET request, any browser or insomnia etc.

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

//this enables the application to listen to it on a port and console.log
//if this isnt call, app will not listen to HTTP requests
//has to be there and at the bottom of the page
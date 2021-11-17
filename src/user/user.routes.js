const { Router } = require("express"); //just require this method from exxpress
const { addUser } = require("./user.controllers")
const userRouter = Router(); //in capital

userRouter.post("/user", addUser); //define a route. to access the endpoint of user, need POST request
//it will run addUser function if endpoint is /user

module.exports = userRouter; 
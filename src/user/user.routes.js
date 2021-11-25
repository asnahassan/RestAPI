const { Router } = require("express"); //just require this method from exxpress
const { addUser, logIn, deleteUser, updateUser } = require("./user.controllers")
const { hashPassword, comparePasswords, tokenAuth } = require("../middleware/index")
const userRouter = Router(); //in capital

userRouter.post("/user", hashPassword, addUser); //define a route. to access the endpoint of user, need POST request
//it will run addUser function if endpoint is /user

userRouter.post("/login", comparePasswords, logIn) //compares the raw password and the hashed password for user to log in
// userRouter.put("/update", updateUser)
// userRouter.delete("/user/:username", deleteUser)

userRouter.get("/token", tokenAuth,  logIn)
module.exports = userRouter; 


//hashpassword is to not save the user's raw password for security purposes.
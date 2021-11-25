const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+..+/,
    },
    password: {
        type: String, 
        required: true,
    }
})


//function syntax and this keyword doesnt work in arrow syntax. 'this' refers to the new user(id)
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.SECRET)
}
    // this is the identifier such as email, username, mongo id to identify a user so it needs to be unique
  //this method belongs to userSchema. this function only purpose to generate a token
//no need for try catch since it is one line
//also the second paramter after 'this' should contain the secret word as when pushing it to github, anyone can see the token. cyber security breach

const User = mongoose.model("User", userSchema);
module.exports = User;

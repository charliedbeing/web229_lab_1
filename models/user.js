/** 
 * FileName:user.js
 * Student's Name:Charlie Ding
 * StudentID:301159548
 * Date: Oct 25 2022
 */

// require modules for the User Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let User = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "username is required",
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "email address is required",
    },   
  },
  {
    collection: "users",
  }
);

// configure options for User Model

let options = { missingPasswordError: "Wrong / Missing Password" };

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", User);

//two parameters (user model and user object)

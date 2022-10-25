/** 
 * FileName:contact.js
 * Student's Name:Charlie Ding
 * StudentID:301159548
 * Date: Oct 25 2022
 */

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");


let contactModel = mongoose.Schema(
  {
    contactName: {
      type: String,
      default: "",
      trim: true,
      required: "contactname is required",
    },
    contactNumber: {
        type: String,
        default: "",
        trim: true,
        required: "contactnumber is required",
      },

    email: {
      type: String,
      default: "",
      trim: true,
      required: "email address is required",
    },   
  },
  {
    collection: "contacts",
  }
);


module.exports = mongoose.model("Contact", contactModel);



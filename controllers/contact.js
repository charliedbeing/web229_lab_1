let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let Contact = require("../models/contact");

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(bookList);

      res.render("contact/list", {
        title: "Contacts",
        ContactList: contactList,
        displayName: req.user ? req.user.username : "",
      });
      //render book.ejs and pass title and Booklist variable we are passing bookList object to BookList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("contact/add", {
    title: "Add Contact",
    displayName: req.user ? req.user.username : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newContact = Contact({
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
  });
  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/contact-list");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Contact.findById(id, (err, contacttoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("contact/edit", {
        title: "Edit Contact",
        contact: contacttoedit,
        displayName: req.user ? req.user.username : "",
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecontact = Contact({
    _id: id,
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
  });
  Contact.updateOne({ _id: id }, updatecontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book list
      res.redirect("/contact-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book list
      res.redirect("/contact-list");
    }
  });
};

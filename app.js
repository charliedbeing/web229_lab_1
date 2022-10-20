/**
File name:: app.js
Student name: Charlie Ding
Student ID:301159548
Date: Sep 30 2022
*/


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// authentication by session and passort lib begin
// step1 : session and db prepare.
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStratergy = passportLocal.Strategy;
let flash = require("connect-flash");

//database_setup
let mongoose = require("mongoose");
let DB = require("./config/db.js");

//point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "connection error:"));
mongodb.once("open", () => {
  console.log("Database Connected");
});


var indexRouter = require('./routes/index');

var contactRouter = require('./routes/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//step2:  setup express session and password  middleware
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

//initialize flash
app.use(flash());

//step 3: intialize passport middleware

app.use(passport.initialize());
app.use(passport.session());

//create usermodel instance
let userModel = require("./models/user");
let User = userModel.User;

//implement a user authenticaion Strategy
passport.use(User.createStrategy());

//serialize and deserialize user object info -encrypt and decrypt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// five main pages router
app.use('/', indexRouter);
app.use('/contact-list',contactRouter);

// app.use('/home', indexRouter);
// app.use('/about', indexRouter);
// app.use('/projects', indexRouter);
// app.use('/services', indexRouter);
// app.use('/contact', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

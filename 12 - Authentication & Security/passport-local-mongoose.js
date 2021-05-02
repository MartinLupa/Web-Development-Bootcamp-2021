//jshint esversion:6
require("dotenv").config(); //dotenv is suggested to be used at the very top of the app.
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

//////////////////////////SESSION INITIALIZE//////////////////////////
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
//////////////////////////PASSPORT INITIALIZE//////////////////////////
app.use(passport.initialize());
app.use(passport.session());

//////////////////////////MONGODB INITIALIZE//////////////////////////
mongoose.connect("mongodb://localhost:27017/userDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}); //Deprecation warning solutions included into MongoClient constructor.
mongoose.set("useCreateIndex", true); //Deprecation warning solution.

//////////////////////////DATABASE SETUP//////////////////////////
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

//USE OF PASSPORT-LOCAL-MONGOOSE TO CREATE LOCAL LOGIN STRATEGY AND SET PASSPORT TO SERIALIZE AND DESERIALIZE USER.
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/secrets", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/register", function(req, res) {
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/login", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});


app.listen(3000, function() {
  console.log("Server started at port 3000.")
});

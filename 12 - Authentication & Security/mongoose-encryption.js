//ECRYPTION MADE USING MONGOOSE ENCRYPTION.

//jshint esversion:6
require("dotenv").config(); //dotenv is suggested to be used at the very top of the app.
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
}); //Connecting to MongoDB.
//////////////////////////DATABASE SETUP//////////////////////////

//Original schema without Mongoose Encryption:
// const userSchema = {
//   email: String,
//   password: String
// };

//New model with Encryption:
const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

//The use of encrypt will encrypt the whole Database. To, for example, maintain the email unencrypted, we need to use an option of "Encrypt Only Certain Fields".
userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

//Post request to be able to catch the info retrieved by the user.
app.post("/register", function(req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
    email: username
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    }
  });
});



app.listen(3000, function() {
  console.log("Server started at port 3000.")
});

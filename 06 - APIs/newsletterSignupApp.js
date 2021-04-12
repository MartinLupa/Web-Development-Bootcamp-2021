//Newsletter signup app using external APIs (Mailchimp). It allows to generate personalized emails to subscribers.

const express = require("express");
const bodyParser = require("body-parser"); //Allows to pass the information that we get sent from the post request.
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
})); //Other modes of Body Parser .text, .json, .urlencoded (when we try to grab information that gets posted to the server from an HTML form).


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {

  const firstName = req.body.fName; //req.body. allows to access each of the properties of an object. fName comes from the signup.html name property.
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {

    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/mypersonalID"

  const options = {
    method: "POST",
    auth: "martinl:not to be published XD",
  }

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});



//First local server connection. express.js with node.js.

const express = require('express');
const app = express();

app.get("/", function (request, response){
  response.send("Hello");
});

app.get("/contact", function (request, response){
  response.send("Contact me on ...");
});

app.get("/about", function (request, response) {
  response.send("Hello, my name is Martin.")
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

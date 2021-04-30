//Database using Robo 3T and MongoDB.
//Server Set up.
//GET, POST, DELETE requests.

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public")); //Use the Public directory to store static files.


//DATABASE SETUP AND USE:
//Database connection:
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

//Database Schema:
const articleSchema = {
  title: String,
  content: String
};
//Model:
const Article = mongoose.model("Article", articleSchema);

//GET route that fetches all articles:
app.get("/articles", function(req, res) {
  Article.find(function(err, foundArticles) {
    if (!err) {
      res.send(foundArticles)
    } else {
      console.log(err);
    }

  });
});

//POST request:
app.post("/articles", function(req, res) {

  //CREATE request based on the data received through POST request.
  const newArticle = new Article ({
  title: req.body.title, //BodyParser to access to the data that was sent through.
  content: req.body.content
  });
  newArticle.save(function (err) {
    if (!err) {
      res.send("Successfully added a new article.")
    } else {
      res.send(err);
    }
  });
});

app.delete("/articles", function (req, res) {
  Article.deleteMany(function(err) {
    if(!err) {
      res.send("Successfully deleted all articles.")
    } else {
      res.send(err)
    }
  })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

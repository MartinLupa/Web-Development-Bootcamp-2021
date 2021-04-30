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


///////////////////REQUEST ALL ITEMS///////////////////
//CHAINED ROUTE HANDLERS with Express:
app.route("/articles")

.get(function(req, res) {
  Article.find(function(err, foundArticles) {
    if (!err) {
      res.send(foundArticles)
    } else {
      console.log(err);
    }

  });
}) //The lack of ; allows to keep on chaining methods.

.post(function(req, res) {

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
})

.delete(function (req, res) {
  Article.deleteMany(function(err) {
    if(!err) {
      res.send("Successfully deleted all articles.")
    } else {
      res.send(err)
    }
  });
});

///////////////////REQUEST A SPECIFIC ITEM///////////////////
//CHAINED ROUTE HANDLERS with Express:
app.route("/articles/:articleTitle")

.get(function(req, res) {

  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No article matching that title found.")
    }
  });
}) //The lack of ; allows to keep on chaining methods.

//UPDATE. Replacing existing information with new one.
.put(function(req, res) {
  Article.update(
    {title: req.params.articleTitle},//Conditions upon which we want to perform this update.
    {title: req.body.title, content: req.body.content},//Actual update that we want to make.
    {overwrite: true},
    function(err){
      if (!err) {
        res.send("Successfully updated article.")
      }
    }
  );
})

.patch(function(req, res) {
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if (!err){
        res.send("Successfully updated article.")
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if (!err) {
        res.send("Successfully deleted.")
      } else {
        res.send(err);
      }
    }
  );
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

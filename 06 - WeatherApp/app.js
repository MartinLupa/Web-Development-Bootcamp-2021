const express = require("express");
const https = require("https");
const bodyParser = require("body-parser"); //Allows to receive the text that the users type into the input.

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "ff940cba41e274cc3edb4b92d31f5f2c";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1>The temperature in " + query + " is: " + temp + " degrees Celsius, " + "it feels like: " + feelsLike + ".</h1>")
      res.write("<h1>The weather is: " + description + ".</h1>")
      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  });
});

app.listen(3000, function(req, res) {
  console.log("Server is running on port 3000")
});

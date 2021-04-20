//Connection to MongoDB using mongoose. It was previously uploaded a file called 09 - MongoDB to show the difference between the code needed to connect using native Driver vs mongoose.

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true }) //Adds name to the Database we want to connect. If it doesnt exist, it creates a new one.

//ADDING NEW SCHEMAS AND DOCUMENTS.
const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
}); //This Schema lays out the foundation of any new document that will be added to the Database.

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

//fruit.save() //Calls the save method to save the previous fruit Document into fruitsDB.

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
  name: "John",
  age: 37,
});

//person.save();


//ADDING MULTIPLE DOCUMENTS.

const kiwi = new Fruit ({
  name: "Kiwi",
  rating: 10,
  review: "Awesome."
});
const orange = new Fruit ({
  name: "Orange",
  rating: 8,
  review: "Juicy."
});
const banana = new Fruit ({
  name: "Banana",
  rating: 4,
  review: "Weird texture."
});

//This lines are commented, since otherwise these documents will  be added every time we run app.js
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved to fruitsDB.");
//   }
// });

//READING AND ACCESSING DATA.
Fruit.find(function(err, fruits){ //Find function accepts a callback, with two parameters: err, and whatever it finds back.
if (err) {
  console.log(err);
} else {
    mongoose.connection.close();
    fruits.forEach(function(fruit){ //Loops through all the elements and access only name attribute.
    console.log(fruit.name);
  });
}
});

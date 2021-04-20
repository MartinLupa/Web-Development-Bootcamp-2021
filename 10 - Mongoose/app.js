//This file adds Validation, Updating and Deleting Data. To make data comply with determinate format and keep it clean.
// const mongoose = require("mongoose");
//
// mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true }) //Adds name to the Database we want to connect. If it doesnt exist, it creates a new one.
//
//
// //Adding new schemas. VALIDATION OF DATA.
// const fruitSchema = new mongoose.Schema ({
//   name: { //Adding validation. If no name is specified, the message will show up together with the error message.
//       type: String,
//       required: [true, "Please specify a name."]
//   },
//   rating: { //Adding validation. For example, limit the range that can be used as an input for rating. Lets say 1 to 10.
//       type: Number,
//       min: 1,
//       max: 10, //ValidationError if the rating is outside 1-10. It won't add data that doesn't comply with the expected format (Database sanitation).
//   },
//   review: String
// }); //This Schema lays out the foundation of any new document that will be added to the Database.
//
// const Fruit = mongoose.model("Fruit", fruitSchema);
//
// const pineapple = new Fruit ({
//   name: "Pineapple",
//   rating: 8,
//   review: "Great for pina colada."
// });

//pineapple.save() //Calls the save method to save the previous fruit Document into fruitsDB.

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema //Adds RELATIONSHIP between Schemas.
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
  name: "Amy",
  age: 30,
  favouriteFruit: pineapple
});

//person.save();

//READING AND ACCESSING DATA.
// Fruit.find(function(err, fruits){ //Find function accepts a callback, with two parameters: err, and whatever it finds back.
// if (err) {
//   console.log(err);
// } else {
//     mongoose.connection.close();
//     fruits.forEach(function(fruit){ //Loops through all the elements and access only name attribute.
//     console.log(fruit.name);
//   });
// }
// });


//UPDATING DATA.
// Person.updateOne({name: "John"}, {favouriteFruit: pineapple}, function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully updated the document.");
//   }
// });

//DELETING DATA.
// Fruit.deleteOne({_id: "607eedf052984626e4eecb17"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document.");
//   }
// });
//
// Fruit.deleteMany({name: "John"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the documents.");
//   }
// });

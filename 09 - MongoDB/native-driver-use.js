//Use of native MongoDB Driver to connect, add documents and find documents into a Database.
//CONNECT TO MONGO DB

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL.
const url = "mongodb://localhost:27017";

// Database Name.
const dbName = "fruitsDB";

// Create a new MongoClient.
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server.
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  //insertDocuments(db, function() { //Only after inserting the documents, we close the connection.
  //First step was to insert documents, Secon step is to find them. In order to avoid repetition of insertion, this function needs to be eliminated. In this case, just put as a comment.
  findDocuments(db, function() {
    client.close();
  });
});

//INSERT DOCUMENTS INTO THE DB
const insertDocuments = function(db, callback) {
  //Get the documents collection
  const collection = db.collection("fruits");
  //Insert some documents
  collection.insertMany([ //Insert many method used to create an array and insert 3 documents in "fruits" collection.
    { //Document 1.
    name: "Apple",
    score: 8,
    review: "Great fruit"
  },
  { //Doument 2
    name: "Orange",
    score: 6,
    review: "Kinda sour"
  },
  { //Document 3
    name: "Banana",
    score: 6,
    review: "Great stuff!"
  }
  ], function (err, result) {
      assert.equal(err, null); //Validate to ensure that there are no errors when we insert documents.
      assert.equal(3, result.result.n); //Ensure that there are 3 results inserted
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
  });
};

//FIND DOCUMENTS INTO THE DB
const findDocuments = function(db, callback) {
  //Get the documents collection
  const collection = db.collection("fruits");
  //Find some DOCUMENTS
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};

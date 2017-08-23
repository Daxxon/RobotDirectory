const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost/robots";
const data = require('./data.js');

MongoClient.connect(uri)
  .then((db) => {
    let collection = db.collection("users");
    console.log("CONNECTION ESTABLISHED");
    collection.insertMany(data.users)
  .then((result) => {
    // console.log(result);
    console.log("DATA CONSUMED");
    db.close();
    // collection.find({}).toArray();
    console.log("DB CLOSED")
  })});

// MongoClient.connect(uri)
//   .then((db) => {
//     console.log("LOOKING FOR USER #2");
//     let collection = db.collection("users");
//     collection.find({id : "2"})
//   })
//   .then((result) => {
//     console.log(result);
//     console.log("CLOSING DB");
//     db.close();
//   })



MongoClient.connect(uri)
  .then((db) => {
    let i = 4;
    console.log("LOOKING FOR USER #" + i);
    let collection = db.collection("users");
    collection.findOne({"id" : i})
  .then((result) => {
    console.log(result);
    collection.deleteMany({});
    db.close();
  })});
  // });






  // MongoClient.connect(uri, function(err, db) {
  //   assert.equal(null, err);
  //   console.log("Connected successfully to server");

  //   insertData(db)
  //   .then(() => {
  //     console.log(db.collection('users').find().toArray());
  //   }, () => {
  //     console.log("SYSTEM FAILURE");
  //   });
  // });

  // function insertData(db) {
  //   var collection = db.collection('users');
  //   collection.insertMany(data.users
  //     , function(err, result) {
  //     assert.equal(err, null);
  //     assert.equal(50, result.result.n);
  //     assert.equal(50, result.ops.length);
  //     console.log("Inserted 50 documents into the collection");
      // callback();
      // console.log(result);
  //   });
  // };

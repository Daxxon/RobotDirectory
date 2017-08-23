const MongoClient = require('mongodb').MongoClient;
const data = require('./data.js');
const path = require('path');
const mustacheExpress = require('mustache-express');
const express = require('express');
const app = express();
const morgan = require('morgan');

const uri = 'mongodb://localhost/robots';

MongoClient.connect(uri)
.then((db) => {
  db.collection('users').deleteMany({});
  db.close();
})

MongoClient.connect(uri)
.then((db) => {
  let collection = db.collection('users');
  console.log("HACKING THE GIBSON...");
  collection.insertMany(data.users)
.then(() => {
  console.log('CLOSING DB...');
  db.close();
  console.log('DB CLOSED');
})});

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.get('/', (req, res) => {
  MongoClient.connect(uri)
    .then((db) => {
      let collection = db.collection('users');
      console.log('CONNECTING...');
      collection.find().toArray()
    .then((users) => {
      console.log('RENDERING...');
      // console.log(users);
      res.render('index', {users});
      db.close();
    })})
});

app.get('/user/:id', (req, res) => {
  let myId = parseInt(req.params.id);
  console.log('USER ID: ' + myId);
  // console.log(typeof(myId));
  MongoClient.connect(uri)
    .then((db) => {
      let collection = db.collection('users');
      console.log('CONNECTING');
      collection.findOne({'id' : myId})
    .then((myUser) => {
      console.log("RENDERING...");
      console.log(myUser);
      res.render('user', myUser);
      db.close();
    })})
});

app.listen(3000, () => console.log('SHOW ME WHAT YOU GOT'));

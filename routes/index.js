var express = require('express');
var mongoose = require('mongoose');
var config = require('../Config/config')

var router = express.Router();

mongoose.connect(config.databaseURI, { useNewUrlParser: true });

var databaseConnection = mongoose.connection;
databaseConnection.on('error', function(){
  throw new Error("Cannot connect to the database!");
});
databaseConnection.once('open', function() {
  console.log("Connected to the database!");
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', googleClientId : config.googleClientId});
});

/* GET login panel */
router.get('/login_panel', function(req, res, next) {
  res.render('Login/login_panel', { title: 'Login Panel' });
});

/* 404 Not Found Error */
router.get('*', function(req, res, next) {
  res.render('Error/404', { title: '404 Not Found' });
});


module.exports = router;

var mongoose = require('mongoose')
var config = require('../Config/config')

require('../models/User')
require('../services/passport')

mongoose.connect(config.databaseURI, { useNewUrlParser: true })

var databaseConnection = mongoose.connection
databaseConnection.on('error', function(){
  throw new Error("Cannot connect to the database!")
})
databaseConnection.once('open', function() {
  console.log("Connected to the database!")
})
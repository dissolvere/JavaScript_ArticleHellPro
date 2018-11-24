var app = require('express')()
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy
var mongoose = require('mongoose')
var config = require('../Config/config')

passport.use(
  new GoogleStrategy({
  clientID : config.googleClientId,
  clientSecret : config.googleClientKey,
  callbackURL :'/auth/google/callback'
  },
    (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refresh token', refreshToken);
    console.log('profile', profile);
  })
);

mongoose.connect(config.databaseURI, { useNewUrlParser: true })

var databaseConnection = mongoose.connection
databaseConnection.on('error', function(){
  throw new Error("Cannot connect to the database!")
});
databaseConnection.once('open', function() {
  console.log("Connected to the database!");
});


app.get('/auth/google', 
passport.authenticate('google', {
  scope: ['profile', 'email']
}))


app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/',function(req,res,next){
  res.send('index');
});

app.listen('8080');

module.exports = app;
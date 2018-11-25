var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy
var config = require('../Config/config')
var mongoose = require('mongoose')
var User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) =>
{
  User.findById(id)
  .then(user => {
    done(null, user)
  })
})

passport.use(
    new GoogleStrategy({
    clientID : config.googleClientId,
    clientSecret : config.googleClientKey,
    callbackURL :'/auth/google/callback'
    },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
        .then((existingUser) =>{
          if(existingUser){
            done(null, existingUser)
          }else{
            new User({googleId : profile.id})
            .save()
            .then(user => done(null, user))
          }
        })
    })
  )
  
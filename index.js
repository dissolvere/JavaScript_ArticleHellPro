var app = require('express')()

//??????????????????????????????????????
var config = require('./Config/config')
var cookieSession = require('cookie-session')
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieSession]
  })
)

var passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

//Connect to the database
require('./routes/databaseConnect')

//Routes
require('./routes/googleAuth')(app)


app.get('/',function(req,res,next){
  res.send('index')
});

app.listen('8080')
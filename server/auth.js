const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const usr = require('./user');

passport.use(new passportLocal.Strategy(function(username, password, done){
  usr.findByUsername(username, function(user) {
    if (!user) {
      return done(null, null);
    }
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  usr.findById(id, function(user) {
    done(null, user);
  });
})

var newUser = function(req, res) {
  var newUsername = req.body.username;
  var newPassword = req.body.password;

  if (!req.body.username || !req.body.password) {
        res.redirect('/login/signup/invalid');
        return ;
      }
  usr.findByUsername(req.body.username, function(user) {
    if (user) {
      res.redirect('/login/signup/alreadytaken');
    }
    else {
      usr.createUser(req.body.username, req.body.password, function() {
        res.redirect('/login/signup/success');
      });
    }
  });
}

exports.passport = passport;
exports.newUser = newUser;

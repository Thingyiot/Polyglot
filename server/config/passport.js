module.exports = function(app) {
  var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
  var express = require('express');
  var documentMapper = require('../libs/database/odm/odm');
  var relationalMapper = require('../libs/database/orm/orm');
  var logger = require('../config/logger');
  var mysql = new relationalMapper();
  var mongo = new documentMapper();
  var unauthorizedError = require('../errors/unauthorizedError');;
  var session = require('express-session');
  var randtoken = require('rand-token');


  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    mongo.getModel('user', 'findOne').findOne({
      _id: id
    }, function(err, user) { // don't ever give out the password or salt
      done(err, user);
    });
  });


  // Use the LocalStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a username and password), and invoke a callback
  //   with a user object.  In the real world, this would query a database;
  //   however, in this example we are using a baked-in set of users.


  passport.use(new LocalStrategy(function(username, password, done) {
    if (username && password) {
      mongo.getModel('user', 'findOne').findOne({
        username: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Unknown user ' + username
          });
        } else {
          checkpassword(user, password, done);
        }
      });
    }
  }));

  function checkpassword(user, password, done) {
    if (user.password === password) {
      mongo.getModel('token', 'findOne').findOne({
        "userId": user._id
      }, function(err, token) {
        if (err) {
          console.log(err);
          throw unauthorizedError;
        };
        return done(null, true, {
          token: token.accessToken
        });
      });
    }
  }

   var authHelper = require('../controllers/authController')(passport,app);
       authHelper.getAuthToken();


  app.use(session({
    secret: 'nyan cat'
  }));
  app.use(passport.initialize());
  app.use(passport.session());

}

 module.exports = function(app) {
   var bodyParser = require('body-parser');
   var errorHandler = require('errorhandler'),
     favicon = require('serve-favicon'),
     cookieParser = require('cookie-parser'),
     methodOverride = require('method-override');
   var session = require('express-session');
   var RedisStore = require('connect-redis')(session);


   var options = {
     host: 'localhost',
     port: 6379
   };

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({
     extended: false
   }));
   app.use(methodOverride());
   app.use(cookieParser());

   app.use(session({
     store: new RedisStore(options),
     secret: 'nyan cat'
   }));

   app.use(function(req, res, next) {
     if (!req.session) {
       return next(new Error('oh no'));// handle error
     }
     console.log('Sucessfully Creating Sessions...');
     next();// otherwise continue
   });

 }

module.exports = function(app) {

 var  passport = require('passport'),
      oauthserver = require('oauth2-server');

 	 app.use(passport.initialize());
 	 app.use(passport.session());
 	 app.oauth = oauthserver({
	  model: {}, // See below for specification 
	  grants: ['password'],
	  debug: true
	});

}
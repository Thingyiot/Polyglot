 module.exports = function(app) {     
	var bodyParser = require('body-parser');
	var errorHandler = require('errorhandler'),
	    favicon = require('serve-favicon'),
	  	cookieParser = require('cookie-parser'),
	    methodOverride = require('method-override');

	  	app.use(bodyParser.json());
	    app.use(bodyParser.urlencoded({ extended: false }));
	    app.use(methodOverride());
	    app.use(cookieParser());    
}    

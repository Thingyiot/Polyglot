'use strict';

var config = require('./config/config');
var app = require('express')();
require('./config/express')(app);
require('./config/db')(app);
require('./config/security')(app);
require(config.build.routes.root)(app);

app.listen(9000);

module.exports = app;

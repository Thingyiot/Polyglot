'use strict';

var bunyan = require('bunyan'),
    logger = bunyan.createLogger({
    name: 'Polyglot',
    stream: process.stdout,
    level: 'info'
});

module.exports = logger;

'use strict';

var bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');

var prettyStdOut = new PrettyStream();

prettyStdOut.pipe(process.stdout);

  var  logger = bunyan.createLogger({
          name: 'polygloy',
          streams: [{
              level: 'info',
              type: 'raw',
              stream: prettyStdOut
          }]
  });

module.exports = logger;

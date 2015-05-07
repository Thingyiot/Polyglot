'use strict';
var randtoken = require('rand-token');
var token = randtoken.generate(256);

var controller = {};

controller.grant = function(req, res) {
    //find token by user id
    //if the token  does not exist
    res.send({
      'token': token
    });
  }
  // Expose app
exports = module.exports = controller;

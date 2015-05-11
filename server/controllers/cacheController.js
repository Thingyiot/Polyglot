'use strict';

var cacheHelper = require('../helpers/cacheHelper');
var logger = require('../config/logger');
var controller = {};

var _helper = new cacheHelper();

controller.set = function(req, res) {
  logger.info(req.params);
  _helper.set(req.params.type, req.params.cache, req.body.key, req.body.value, req.body.ttl, res);
}

controller.get = function(req, res) {
  logger.info(req.params);
  _helper.get(req.params.type, req.params.cache, req.body.key, res);
}

// Expose app
exports = module.exports = controller;

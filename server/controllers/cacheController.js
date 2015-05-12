'use strict';

var cacheHelper = require('../helpers/cacheHelper');
var logger = require('../config/logger');
var controller = {};

var _helper = new cacheHelper();

controller.set = function(req, res) {
  logger.info(req.params);
  try {
    _helper.set(req.params.type, req.params.cache, req.body.key, req.body.value, req.body.ttl, res);
  } catch (err) {
    logger.err(err);
  }
}

controller.get = function(req, res) {
  try {
    _helper.get(req.params.type, req.params.cache, req.body.key, res);
  } catch (err) {
    logger.error(err);
  }
}

controller.count = function(req, res) {
  logger.info(req.params);
  try {
    _helper.count(req.params.type, req.params.cache, req.body.key, res);
  } catch (err) {
    logger.error(err);
  }
}

controller.del = function(req, res) {
  logger.info(req.params);
  try {
    _helper.del(req.params.type, req.params.cache, req.body.key, res);
  } catch (err) {
    logger.error(err);
  }
}


// Expose app
exports = module.exports = controller;

var config = require('../../../config/config');
var path = require(config.modules.path);
var fs = require(config.modules.fs);
var relational = require(config.modules.orm);
var logger = require('../../../config/logger');

function orm(link) {
  this.link = link;
}

orm.prototype.connect = function(url) {
  relational.connect(url, function(err, db) {
    if (err) throw err;
    logger.info('Connected to:' + url);
    bootStrapModels(db);
  });
}

function bootStrapModels(db) {
  Device = require('../../../models/orm/device')(db);
}

orm.prototype.getModel = function(modelName) {
  if (modelName === 'device') {
    return Device;
  }
}

// Expose app
exports = module.exports = orm;

var config = require('../../../config/config');
var path = require(config.modules.path);
var fs = require(config.modules.fs);
var relational = require(config.modules.orm);
var Device = null;

function orm(link) {
  this.link = link;
}

orm.prototype.connect = function(url) {

  relational.connect(url, function(err, db) {
    if (err) throw err;
    console.log('Connected to:' + url);
    bootStrapModels(db);
  });
}

function bootStrapModels(db) {
  Device = require('../../../models/orm/device')(db);
}

// Expose app
exports = module.exports = orm;

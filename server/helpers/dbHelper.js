var documentMapper = require('../libs/database/odm/odm');
var relationalMapper = require('../libs/database/orm/orm');
var logger = require('../config/logger');
var mysql = new relationalMapper();
var mongo = new documentMapper();
var _ = require('lodash');
var x;

function dbHelper(model) {
  this.model = model;
}

dbHelper.prototype.create = function(dbType, database, action, model, json, res) {
  if (dbType === 'document' && database === 'mongo' && action === 'create') {
    mongo.getModel(model, action, json.record).save(res.send({
      inserted: {
        record: json.record
      }
    }));
  } else if (dbType === 'relational' && database === 'mysql' && action === 'create') {

    try {
      model.create(json.record, function(err, results) {
        if (err) throw err;
        logger.info({
          inserted: {
            record: json.record
          }
        });
        res.send({
          inserted: {
            record: json.record
          }
        });
      });
    } catch (err) {
      logger.error(err);
    }
  }
}

dbHelper.prototype.findOne = function(dbType, database, action, model, req, res) {
  if (dbType === 'document' && database === 'mongo' && action === 'findOne') {
    mongo.getModel(model, action).findOne({
      "_id": req.params._id
    }, function(err, obj) {
      if (err) return handleError(err);
      res.send({
        result: obj
      });
    })
  } else if (dbType === 'relational' && database === 'mysql' && action === 'findOne') {
    var call = model.get(req.params.id, function(err, obj) {
      logger.info({
        result: obj
      });
      res.send({
        result: obj
      });
    });
  }
}


dbHelper.prototype.findMany = function(dbType, database, action, model, req, res) {
  if (dbType === 'document' && database === 'mongo' && action === 'findMany') {
    mongo.getModel(model, action).find({
      '_id': {
        $in: req.params._id
      }
    }, function(err, obj) {
      logger.info({
        result: obj
      });
      res.send({
        result: obj
      });
    });
  } else if (dbType === 'relational' && database === 'mysql' && action === 'findMany') {
    model.find(req.params, function(err, obj) {
      logger.info({
        result: obj
      });
      res.send({
        result: obj
      });
    });
  }
}

dbHelper.prototype.del = function(dbType, database, action, model, req, res) {
  if (dbType === 'document' && database === 'mongo' && action === 'delete') {
    mongo.getModel(model, action).remove({
      _id: req.params._id
    }, function(err) {
      if (!err) {
        logger.info({
          result: "Delete Successful!"
        });
        res.send({
          result: "Delete Successful!"
        });
      }


    });
  } else if (dbType === 'relational' && database === 'mysql' && action === 'delete') {
    model.find(req.params.id).remove(function(err) {
      logger.info({
        result: "Delete Successful!"
      });
      res.send({
        result: "Delete Successful!"
      });
    });
  }
}

dbHelper.prototype.count = function(dbType, database, action, model, req, res) {
  if (dbType === 'document' && database === 'mongo' && action === 'count') {
    mongo.getModel(model, action).count({}, function(err, count) {
      logger.info({
        result: count
      });
      res.send({
        result: count
      });
    })
  } else if (dbType === 'relational' && database === 'mysql' && action === 'count') {
    model.find().count(function(err, count) {
      logger.info({
        result: count
      });
      res.send({
        result: count
      });
    });
  }
}


dbHelper.prototype.getModel = function(modelName) {
  if (modelName === 'device') {
    return mysql.getModel('device');
  }
  return modelName;
}


// Expose app
exports = module.exports = dbHelper;

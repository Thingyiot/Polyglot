module.exports = function(app) {

var documentMapper=require('../libs/database/odm/odm');
var relationalMapper=require('../libs/database/orm/orm');
var keyValueMapper=require('../libs/database/key-value/keyValue');

var dev=require('../config/env/development');

var options={port:6379,host:'127.0.0.1',db:0};

var mongo=new documentMapper();
	mongo.connect(dev.mongo.uri);
	mongo.bootStrapModels();

var mysql=new relationalMapper();
    mysql.connect(dev.mysql.uri);

var redis=new keyValueMapper();
      redis.connect(options);

}

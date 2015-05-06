module.exports = function(app) {

var documentMapper=require('../libs/database/odm/odm');
var relationalMapper=require('../libs/database/orm/orm');

var dev=require('../config/env/development');

var mongo=new documentMapper();
	mongo.connect(dev.mongo.uri);
	mongo.bootStrapModels();

var mysql=new relationalMapper();	
    mysql.connect(dev.mysql.uri);

}
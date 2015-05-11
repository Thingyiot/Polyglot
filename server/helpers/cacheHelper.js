var logger = require('../config/logger');
var redisCacheManager=require('../libs/database/key-value/redisCacheManager');
var redis=new redisCacheManager();

function cacheHelper(model) {
  this.model = model;
}

cacheHelper.prototype.set = function(type,cache,key,json,ttl,res) {
    redis.set(key,json,ttl);
    res.send({set:{key:key,value:json}});
}


cacheHelper.prototype.multiSet = function(type,cache,key,json,ttl,res) {
    redis.set(key,json,ttl);
    res.send({set:{key:key,value:json}});
}


// Expose app
exports = module.exports = cacheHelper;

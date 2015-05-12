var logger = require('../config/logger');
var redisCacheManager=require('../libs/database/key-value/redisCacheManager');
var redis=new redisCacheManager();

function cacheHelper(model) {
  this.model = model;
}

cacheHelper.prototype.set = function(type,cache,key,json,ttl,res) {
    redis.set(key,json,ttl,function(){
      console.log('Successfully set key '+ key + 'with value' + value );
    });
    res.send({set:{key:key,value:json}});
}


cacheHelper.prototype.get = function(type,cache,key,res) {
    redis.get(key,res);
}

cacheHelper.prototype.count = function(type,cache,key,res) {
    redis.count(key,res);
}

cacheHelper.prototype.del = function(type,cache,key,res) {
    redis.del(key,res);
}

// Expose app
exports = module.exports = cacheHelper;

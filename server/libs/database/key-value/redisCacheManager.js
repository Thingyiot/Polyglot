var redis = require('redis');
var options = {
  port: 6379,
  host: '127.0.0.1',
  db: 0
};
var client = redis.createClient(options);

function redisCacheManager(link) {
  this.link = link;
}

redisCacheManager.prototype.connect = function() {
  client.on('connect', function() {
    console.log('successfilly connected to redis .... ' + 'Host ' + options.host + ":" + options.port);
  });
}

redisCacheManager.prototype.set = function(key, value, ttl) {
  client.set(key, value, ttl, function(key, value) {
    if (ttl) {
      client.expire(key, ttl);
    }
  });
}

redisCacheManager.prototype.multiSet = function(key, values, ttl) {

}

// Expose app
exports = module.exports = redisCacheManager;

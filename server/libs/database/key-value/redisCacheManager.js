var logger = require('../../../config/logger');
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
    logger.info('successfilly connected to redis .... ' + 'Host ' + options.host + ":" + options.port);
  });
}

redisCacheManager.prototype.set = function(key, value, ttl) {
  client.set(key, value);
  if (ttl) {
    client.expire(key, ttl);
  }
}

redisCacheManager.prototype.get = function(key, res) {
  client.get(key, function(err, value) {
    if (!value) {
      logger.info('Missing or expired Key..' + key);
    }
    res.send({
      returned: {
        key: key,
        value: value
      }
    });
  });
}

redisCacheManager.prototype.count = function(key, res) {
  client.get(key, function(err, value) {
    if (value) {
      logger.info("count for key "+key+":"+value.length);
      res.send({
        returned: {
          key: key,
          count: value.length
        }
      });
    }
    else{
      logger.error('The value returned is null ');
      res.send({err:'The value returned is null '});
    }
  });
}


redisCacheManager.prototype.del = function(key, res) {
  client.del(key, function(err, value) {
    res.send({
      returned: {
        key: key,
        count: value
      }
    });
  });
}

// Expose app
exports = module.exports = redisCacheManager;

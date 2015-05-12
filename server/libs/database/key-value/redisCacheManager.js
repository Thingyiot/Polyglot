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
  client.set(key, value);
  if (ttl) {
    client.expire(key, ttl);
  }
}

redisCacheManager.prototype.get = function(key, res) {
  client.get(key, function(err, value) {
    if (!value) {
      console.log('Missing or expired Key..' + key);
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
      console.log(value.length);
      res.send({
        returned: {
          key: key,
          count: value.length
        }
      });
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

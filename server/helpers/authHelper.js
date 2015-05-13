module.exports = function(passport,app) {
  var logger = require('../config/logger');
  var randtoken = require('rand-token');

  var obj={
    authenticate:function(req,res,next){
      passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        var token = randtoken.generate(256);
        var obj = {
          'message': 'user does not exist new token generated ..',
          'token': token
        };
        logger.info(obj);
        res.send(obj);
      } else {
        var obj = {
          'token': info.token
        };
        logger.info(obj);
        res.send(obj);
      }
    })(req, res, next);
   }
};

  return obj;

}

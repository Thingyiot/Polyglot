module.exports = function(passport,app) {
  var logger = require('../config/logger');
  var randtoken = require('rand-token');
  var dbHelper=require('./dbHelper');
  var _helper=new dbHelper();
  var Promise = require("bluebird");

  var obj={
    authenticate:function(req,res,next){
      passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        var token = randtoken.generate(256);
        var response = {
          'message': 'user does not exist new token generated ..',
          'token': token
        };
        logger.info(response);
        res.send(response);
      } else {
        var response = {
          'token': info.token
        };
        res.send(response);
      }
    })(req, res, next);
   },
    getClientId:function(req,res){
        _helper.findOne('document','mongo','findOne','token',req,res);
    },
    addClient:function(req,res){

    }
};

  return obj;

}

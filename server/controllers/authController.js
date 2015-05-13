module.exports = function(passport,app) {
  var obj={
    getAuthToken:function(){
       app.get('/api/auth/token', function(req, res, next) {
   var authHelper = require('../helpers/authHelper')(passport,app);
       authHelper.authenticate(req, res, next);
      });
    }
  }

  return obj;
}

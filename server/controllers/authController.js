module.exports = function(passport,app) {

  var authHelper = require('../helpers/authHelper')(passport,app);

  var obj={
    getAuthToken:function(){
       app.get('/api/v1/auth/token', function(req, res, next) {
         authHelper.authenticate(req, res, next);
      });
    },
    getClientId:function(){
      app.post('/api/v1/auth/client/getid', function(req, res, next) {
         if(req.body.token){
           authHelper.getClientId(req, res);
         }
       });
    },
    addClient:function(){
      app.post('/api/v1/auth/client/add', function(req, res, next) {

       });
    }

  }

  return obj;
}

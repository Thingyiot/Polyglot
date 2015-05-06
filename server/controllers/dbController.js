'use strict';

   var helper=require('../helpers/dbHelper');
   var _helper=new helper();
   var logger=require('../config/logger');
   var controller={};

 controller.create= function(req, res) {
     logger.info({params:req.params});
     logger.info({requestBody:req.body});
     var model = _helper.getModel(req.params.model);
      try{
         _helper.create(req.params.type,req.params.db,'create',model,req.body,res);
      }
      catch(err){
          throw new Error(err);
          logger.error({error:err});
          res.send({error:err});
      }
  }

  controller.findOne= function(req, res) {
     console.log({params:req.params});
     console.log({requestBody:req.body});

     var model = _helper.getModel(req.params.model);

      try{
        var result = _helper.findOne(req.params.type,req.params.db,'findOne',model,req.body,res);
      }
      catch(err){
          throw new Error(err);
          res.send({error:err});
      }
  };

  controller.findMany=function(req, res) {
     console.log({params:req.params});
     console.log({requestBody:req.body});

     var model = _helper.getModel(req.params.model);

      try{
        var result = _helper.findMany(req.params.type,req.params.db,'findMany',model,req.body,res);
      }
      catch(err){
          throw new Error(err);
          res.send({error:err});
      }
  };

 controller.update=function(req, res) {

 }

 controller.del=function(req, res) {
     console.log({params:req.params});
     console.log({requestBody:req.body});

     var model = _helper.getModel(req.params.model);

      try{
        var result = _helper.del(req.params.type,req.params.db,'delete',model,req.body,res);
      }
      catch(err){
          throw new Error(err);
          res.send({error:err});
      }
 }

controller.count=function(req, res) {
     console.log({params:req.params});
     console.log({requestBody:req.body});

     var model = _helper.getModel(req.params.model);

      try{
        var result = _helper.count(req.params.type,req.params.db,'count',model,req.body,res);
      }
      catch(err){
          throw new Error(err);
          res.send({error:err});
      }
 }

 // Expose app
exports = module.exports =  controller ;


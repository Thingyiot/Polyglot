'use strict';

module.exports = function(mongoose) {

  var db = mongoose.connection,
    Schema = mongoose.Schema,
    validate = require('mongoose-validator').validate,
    _ = require('lodash'),
    autoIncrement = require('mongoose-auto-increment');

  autoIncrement.initialize(db);

  var TYPE = 'OAuthAccessTokens';

  var schema = new Schema({
    id: {
      type: Number,
      required: true
    },
    accessToken: {
      type: String,
      required: true,
      unique: true
    },
    clientId: {
      type: Number,
      required: true,
      unique: true
    },
    userId: {
      type: Number,
      required: true,
       unique: true
    },
    expires: {
      type: String,
      required: true
    }
  });

  /**
   * Methods
   */
  schema.methods = {
    //get model
    //  var Sensor = mongoose.model('Sensor'),
  };

  /**
   * Expose type to outside world.
   * @type {string}
   */
  schema.statics.TYPE = TYPE;

  return db.model(TYPE, schema);
};

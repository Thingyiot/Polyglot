'use strict';

module.exports = function(mongoose) {

  var db = mongoose.connection,
    Schema = mongoose.Schema,
    validate = require('mongoose-validator').validate,
    _ = require('lodash'),
    autoIncrement = require('mongoose-auto-increment');

  autoIncrement.initialize(db);

  var TYPE = 'OAuthClients';

  var schema = new Schema({
    clientId: {
      type: String,
      required: true
    },
    clientSecret: {
      type: String,
      required: true
    },
    redirectUri: {
      type: String,
      required: true
    },
    secret: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  });

  /**
   * Methods
   */
  schema.methods = {

  };

  /**
   * Expose type to outside world.
   * @type {string}
   */
  schema.statics.TYPE = TYPE;

  return db.model(TYPE, schema);
};

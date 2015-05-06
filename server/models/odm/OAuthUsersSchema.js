'use strict';

module.exports = function(mongoose) {

  var db = mongoose.connection,
    Schema = mongoose.Schema,
    validate = require('mongoose-validator').validate,
    _ = require('lodash'),
    autoIncrement = require('mongoose-auto-increment');

  autoIncrement.initialize(db);

  var TYPE = 'OAuthUsers';

  var schema = new Schema({
    username: {
      type: String
    },
    password: {
      type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String,
      default: ''
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

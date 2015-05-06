'use strict';

module.exports = function(mongoose) {

  var db = mongoose.connection,
    Schema = mongoose.Schema,
    validate = require('mongoose-validator').validate,
    _ = require('lodash'),
    autoIncrement = require('mongoose-auto-increment');

  autoIncrement.initialize(db);

  var TYPE = 'OAuthRefreshTokens';

  var schema = new Schema({
    refreshToken: {
      type: String
    },
    clientId: {
      type: String
    },
    userId: {
      type: String
    },
    expires: {
      type: Date
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

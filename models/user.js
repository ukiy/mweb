var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: {
    type: String
  },
  company: {
    type: String
  },
  discountRate: {
    type: Number
  }
});

module.exports = mongoose.model('User', UserSchema);

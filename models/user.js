var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: {
    type: String
  },
  userCompany: {
    type: String
  },
  userDiscountRate: {
    type: Number
  }
});

module.exports = mongoose.model('User', UserSchema);

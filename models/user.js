var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: String,
  userCompany: String,
  userDiscountRate: Number,
});

module.exports = mongoose.model('User', UserSchema);

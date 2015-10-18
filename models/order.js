var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  _id: {
    type:String
  },
  dateTime: {
    type: Number
  },
  userId: {
    type: String,
    ref: 'User'
  },
  itemId: {
    type: String,
    ref: 'Item'
  },
  quantity: {
    type: Number
  },
  state: {
    type: String
  },
  tags: {
    type: [String]
  }
});

module.exports = mongoose.model('Order', OrderSchema);

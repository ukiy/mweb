var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  orderId: {
    type:String
  },
  orderDateTime: {
    type: Number
  },
  orderUserId: {
    type: String,
    ref: 'User'
  },
  orderItemId: {
    type: String,
    ref: 'Item'
  },
  orderQuantity: {
    type: Number
  },
  orderState: {
    type: String
  },
  orderTags: {
    type: [String]
  }
});

module.exports = mongoose.model('Order', OrderSchema);

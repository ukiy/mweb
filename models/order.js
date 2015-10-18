var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  orderId: {
    type:String,
    unique: true
  },
  orderDateTime: {
    type: Number,
    index: true
  },
  orderUserId: {
    type: String,
    index: true
  },
  orderItemId: {
    type: String,
    index: true
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

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  orderId: String,
  orderDateTime: Date,
  orderUserId: String,
  orderItemId: String,
  orderOuantity: Number,
  orderState: String,
  orderTags: [String]
});

module.exports = mongoose.model('Order', OrderSchema);

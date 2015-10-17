var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  itemId: String,
  itemSupplier: String,
  itemStockQuantity: Number,
  itemBesePrice: Number,
  itemTags: [String]

});

module.exports = mongoose.model('Item', ItemSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  _id: {
    type: String
  },
  supplier: {
    type: String
  },
  stockQuantity: {
    type: Number
  },
  basePrice: {
    type: Number
  },
  tags: {
    type: [String]
  }
});

module.exports = mongoose.model('Item', ItemSchema);

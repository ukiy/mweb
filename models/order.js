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
  user: {
    userId: {
      type: String,
      unique: true
    },
    userCompany: {
      type: String
    },
    userDiscountRate: {
      type: Number
    }
  },
  orderItemId: {
    type: String,
    index: true
  },
  item: {
    itemId: {
      type: String,
      unique: true
    },
    itemSupplier: {
      type: String
    },
    itemStockQuantity: {
      type: Number
    },
    itemBasePrice: {
      type: Number
    },
    itemTags: {
      type: [String]
    }
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

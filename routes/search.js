var Order = require('../models/order');
var User = require('../models/user');
var Item = require('../models/item');
var _ = require('lodash');

module.exports = function(query){
  var collection = null;
  for (var pro in query) {
    if (pro.indexOf('findByOrder') > -1) {
      collection = 'order';
      break;
    }
    if (pro.indexOf('findByUser') > -1) {
      collection = 'user';
      break;
    }
    if (pro.indexOf('findByItem') > -1) {
      collection = 'item';
      break;
    }
  }
  if (collection === 'order'){
    return searchOrder(query);
  }
  if (collection === 'user'){
    return searchUser(query);
  }
  if (collection === 'item'){
    return searchItem(query);
  }
  return { error: "invalid query"};
}
function searchOrder(query){
  var search = {};
  console.log(query);
  if (query.hasOwnProperty('findByOrderDateTimeGTE')){
    search.orderDateTime = { $gt: parseInt(query.findByOrderDateTimeGTE) };
  }
  if (query.hasOwnProperty('findByOrderDateTimeLTE')){
    search.orderDateTime = { $lt: parseInt(query.findByOrderDateTimeLTE) };
  }
  if (query.hasOwnProperty('findByOrderUserId')){
    search.orderUserId = query.findByOrderUserId;
  }
  if (query.hasOwnProperty('findByOrderItemId')){
    search.orderItemId = query.findByOrderItemId;
  }
  if (query.hasOwnProperty('findByOrderQuantityGTE')){
    search.orderQuantity = { $gte : query.findByOrderQuantityGTE };
  }
  if (query.hasOwnProperty('findByOrderQuantityLTE')){
    search.orderQuantity = { $lte : query.findByOrderQuantityLTE };
  }
  if (query.hasOwnProperty('findByOrderState')){
    search.orderState = query.findByOrderState;
  }
  if (query.hasOwnProperty('findByOrderTagsIncludeAll')){
    // Todo conver String to array
    var tags = query.findByOrderTagsIncludeAll.split(',');
    search.orderTags = { $all: query.findByOrderTagsIncludeAll }
  }
  if (query.hasOwnProperty('findByOrderTagsIncludeAny')){
    // Todo conver String to array
    var tags = query.findByOrderTagsIncludeAny.split(',');
    search.orderTags = { $in: query.findByOrderTagsIncludeAll };
  }
  console.log('search', search);
  if (query.hasOwnProperty('limit')){
    return Order.find(search).sort({'orderDateTime': -1}).limit(query.limit).exec();
  }
  return Order.find(search).sort({'orderDateTime': -1}).limit(100).exec();
};

function searchUser(query) {
  var search = {};
  console.log(query);
  if (query.hasOwnProperty('findByUserCompany')){
    search.userCompany = query.findByUserCompany;
  }
  if (query.hasOwnProperty('findByUserDiscountRateGTE')){
    search.userDiscountRate = { $gte: query.findByUserDiscountRateGTE };
  }
  if (query.hasOwnProperty('findByUserDiscountRateLTE')){
    search.userDiscountRate = { $gte: query.findByUserDiscountRateGTE };
  }
  if (query.hasOwnProperty('limit')){
    return User.find(search).exec().then(function(users){
      var ids = _.pluck(users, 'userId');
      return Order.find({orderUserId: {$in : ids}}).limit(query.limit).exec();
    });
  }
  return User.find(search).limit(100).exec().then(function(users){
    var ids = _.pluck(users, 'userId');
    return Order.find({ordrUserId: {$in : ids}}).limit(100).exec();
  });
};

function searchItem(query){
  var search = {};
  console.log(query);
  if (query.hasOwnProperty('findByItemSupplier')){
    search.itemSupplier = query.findByItemSupplier;
  }
  if (query.hasOwnProperty('findByItemStockQuantityGTE')){
    search.itemStockQuantity = { $gte: query.findByItemStockQuantityGTE };
  }
  if (query.hasOwnProperty('findByItemStockQuantityLTE')){
    search.itemStockQuantity = { $lte : query.findByItemStockQuantityLTE };
  }
  if (query.hasOwnProperty('findByItemBasePriceGTE')){
    search.itemBasePrice = { $gte : query.findByItemBasePriceGTE };
  }
  if (query.hasOwnProperty('findByItemBasePriceLTE')) {
    search.itemBasePrice = { $lte : query.findByItemBasePriceLTE };
  }
  if (query.hasOwnProperty('findByItemTagsIncludeAll')){
    var tags = query.findByOrderTagsIncludeAll.split(',');
    search.itemTags = { $all: query.findByItemTagsIncludeAll }
  }
  if (query.hasOwnProperty('findByItemTagsIncludeAny')){
    search.itemTags = { $in: query.findByItemTagsIncludeAny }
  }
  if (query.hasOwnProperty('limit')){
    return Item.find(search).exec().then(function(items){
      var ids = _.pluck(items, 'itemId');
      return Order.find({orderItemId : {$in : ids } }).limit(query.limit).exec().;
    });
  }
  return Item.find(search).exec().then(function(items){
    var ids = _.pluck(items, 'itemId');
    return Item.find({orderItemId : {$in : ids}}).limit(100).exec();
  });
}

function findByOrderDateTimeGTE(date){

}

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
    search.orderDateTime = { $gte: parseInt(query.findByOrderDateTimeGTE) };
  }
  if (query.hasOwnProperty('findByOrderDateTimeLTE')){
    if (search.orderDateTime){
      search.orderDateTime.$lte = parseInt(query.findByOrderDateTimeLTE);
    }else {
      search.orderDateTime = { $lte: parseInt(query.findByOrderDateTimeLTE) };
    }
  }
  if (query.hasOwnProperty('findByOrderUserId')){
    search.orderUserId = query.findByOrderUserId;
  }
  if (query.hasOwnProperty('findByOrderItemId')){
    search.orderItemId = query.findByOrderItemId;
  }
  if (query.hasOwnProperty('findByOrderQuantityGTE')){
    search.orderQuantity = { $gte : parseInt(query.findByOrderQuantityGTE) };
  }
  if (query.hasOwnProperty('findByOrderQuantityLTE')){
    if (query.hasOwnProperty('findByOrderQuantityLTE')){
      search.orderQuantity.$lte = parseInt(query.findByOrderQuantityLTE);
    }else {
      search.orderQuantity = { $lte : parseInt(query.findByOrderQuantityLTE) };
    }
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
    search.userDiscountRate = { $gte: parseInt(query.findByUserDiscountRateGTE) };
  }
  if (query.hasOwnProperty('findByUserDiscountRateLTE')){
    if (search.userDiscountRate){
      search.userDiscountRate.$lte = parseInt(query.findByUserDiscountRateLTE);
    }else {
      search.userDiscountRate = { $lte: query.findByUserDiscountRateLTE };
    }
  }
  if (query.hasOwnProperty('limit')){
    return User.find(search).exec().then(function(users){
      var ids = _.pluck(users, 'userId');
      return Order.find({orderUserId: {$in : ids}}).sort({'orderDateTime': -1}).limit(query.limit).exec();
    });
  }
  return User.find(search).limit(100).exec().then(function(users){
    var ids = _.pluck(users, 'userId');
    return Order.find({ordrUserId: {$in : ids}}).sort({'orderDateTime': -1}).limit(100).exec();
  });
};

function searchItem(query){
  var search = {};
  console.log(query);
  if (query.hasOwnProperty('findByItemSupplier')){
    search.itemSupplier = query.findByItemSupplier;
  }
  if (query.hasOwnProperty('findByItemStockQuantityGTE')){
    search.itemStockQuantity = { $gte: parseInt(query.findByItemStockQuantityGTE) };
  }
  if (query.hasOwnProperty('findByItemStockQuantityLTE')){
    if (search.itemStockQuantity){
      search.itemStockQuantity.$lte = parseInt(query.findByItemStockQuantityLTE);
    }else {
      search.itemStockQuantity = { $lte : parseInt(query.findByItemStockQuantityLTE) };
    }
  }
  if (query.hasOwnProperty('findByItemBasePriceGTE')){
    search.itemBasePrice = { $gte : parseInt(query.findByItemBasePriceGTE) };
  }
  if (query.hasOwnProperty('findByItemBasePriceLTE')) {
    if (search.itemBasePrice){
      search.itemBasePrice.$lte = query.findByItemBasePriceLTE;
    }else {
      search.itemBasePrice = { $lte : parseInt(query.findByItemBasePriceLTE) };
    }
  }
  if (query.hasOwnProperty('findByItemTagsIncludeAll')){
    var tags = query.findByItemTagsIncludeAll.split(',');
    search.itemTags = { $all: query.findByItemTagsIncludeAll }
  }
  if (query.hasOwnProperty('findByItemTagsIncludeAny')){
    search.itemTags = { $in: query.findByItemTagsIncludeAny }
  }
  if (query.hasOwnProperty('limit')){
    return Item.find(search).exec().then(function(items){
      var ids = _.pluck(items, 'itemId');
      return Order.find({orderItemId : {$in : ids } }).sort({'orderDateTime': -1}).limit(query.limit).exec();
    });
  }
  return Item.find(search).exec().then(function(items){
    var ids = _.pluck(items, 'itemId');
    return Item.find({orderItemId : {$in : ids}}).sort({'orderDateTime': -1}).limit(100).exec();
  });
}

function findByOrderDateTimeGTE(date){

}

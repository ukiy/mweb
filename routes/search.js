var Order = require('../models/order');
var User = require('../models/user');
var Item = require('../models/item');
var _ = require('lodash');

module.exports = function(query){
  return searchOrder(query);
}
function searchOrder(query){
  var search = {};
  var tag;
  var limit;
  console.log(query);
  search.orderDateTime = {};
  search.orderDateTime.$gte = parseInt(query.findByOrderDateTimeGTE);
  search.orderDateTime.$lte = parseInt(query.findByOrderDateTimeLTE);
//user
  search.orderUserId = query.findByOrderUserId;
  search.orderItemId = query.findByOrderItemId;

  search.orderQuantity = {};
  search.orderQuantity.$gte = parseInt(query.findByOrderQuantityGTE);
  search.orderQuantity.$lte = parseInt(query.findByOrderQuantityLTE);
  search.orderState = query.findByOrderState;

  if (query.findByOrderTagsIncludeAll){
    tags = query.findByOrderTagsIncludeAll.split(',');
  }
  search.orderTags = {};
  search.orderTags.$all =  tags;
  tags = null;
  if (query.findByOrderTagsIncludeAny){
    tags = query.findByOrderTagsIncludeAny.split(',');
  }
  search.orderTags.$in = tags;
  tags = null;

// user
  search.user = search.user || {};
  search['user.userCompany'] = query.findByUserCompany;
  search['user.userDiscountRate'] = {};
  search['user.userDiscountRate'].$gte = parseInt(query.findByUserDiscountRateGTE);
  search['user.userDiscountRate'].$lte = parseInt(query.findByUserDiscountRateLTE);

// item
  search.item = search.item || {};
  search['item.itemSupplier'] = query.findByItemSupplier;

  search.item.itemStockQuantity = {};
  search['item.itemStockQuantity'] = {};
  search['item.itemStockQuantity'].$gte = parseInt(query.findByItemStockQuantityGTE);
  search['item.itemStockQuantity'].$lte = parseInt(query.findByItemStockQuantityLTE);

  search.item.itemBasePrice = {};
  search['item.itemBasePrice'] = {};
  search['item.itemBasePrice'].$gte = parseInt(query.findByItemBasePriceGTE) };
  search['item.itemBasePrice'].$lte = parseInt(query.findByItemBasePriceLTE);

  search['item.itemTags'] = {};
  if (query.findByItemTagsIncludeAll){
    tags = query.findByItemTagsIncludeAll.split(',');
  }
  search['item.itemTags'] = { $all: tags }
  tags = null;
  if (query.findByItemTagsIncludeAny){
    tags = query.findByItemTagsIncludeAny.split(',');
  }
  search['item.itemTags'] = { $in: tags }
  tags = null;




  if (query.hasOwnProperty('limit')){
    limit = parseInt(query.limit);
  }else {
    limit = 100;
  }
  console.log(search);
  return Order.find(search).sort({'orderDateTime': -1}).limit(limit).exec();
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
    console.log(search);
    return User.find(search).exec().then(function(users){
      var ids = _.pluck(users, 'userId');
      return Order.find({orderUserId: {$in : ids}}).sort({'orderDateTime': -1}).limit(query.limit).exec();
    });
  }
  console.log(search);
  return User.find(search).limit(100).exec().then(function(users){
    var ids = _.pluck(users, 'userId');
    return Order.find({ordrUserId: {$in : ids}}).sort({'orderDateTime': -1}).limit(100).exec();
  });
};

function searchItem(query){
  var search = {};
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
    var tags = query.findByItemTagsIncludeAny.split(',');
    search.itemTags = { $in: query.findByItemTagsIncludeAny }
  }
  if (query.hasOwnProperty('limit')){
    console.log(search);
    return Item.find(search).exec().then(function(items){
      var ids = _.pluck(items, 'itemId');
      return Order.find({orderItemId : {$in : ids } }).sort({'orderDateTime': -1}).limit(query.limit).exec();
    });
  }
  console.log(search);
  return Item.find(search).exec().then(function(items){
    var ids = _.pluck(items, 'itemId');
    return Item.find({orderItemId : {$in : ids}}).sort({'orderDateTime': -1}).limit(100).exec();
  });
}

function findByOrderDateTimeGTE(date){

}

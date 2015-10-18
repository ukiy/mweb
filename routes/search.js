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
  if (query.findByOrderDateTimeGTE){
    search.orderDateTime = search.orderDateTime || {};
    search.orderDateTime.$gte = parseInt(query.findByOrderDateTimeGTE);
  }
  if (query.findByOrderDateTimeLTE){
    search.orderDateTime = search.orderDateTime || {};
    search.orderDateTime.$lte = parseInt(query.findByOrderDateTimeLTE);
  }
//user
  if (query.findByOrderUserId){
    search.orderUserId = query.findByOrderUserId;
  }
  if (query.findByOrderItemId){
    search.orderItemId = query.findByOrderItemId;
  }

  if (query.findByOrderQuantityGTE){
    search.orderQuantity = search.orderQuantity || {};
    search.orderQuantity.$gte = parseInt(query.findByOrderQuantityGTE);
  }
  if (query.findByOrderQuantityLTE){
    search.orderQuantity = search.orderQuantity || {};
    search.orderQuantity.$lte = parseInt(query.findByOrderQuantityLTE);
  }

  if (query.findByOrderState){
    search.orderState = query.findByOrderState;
  }

  if (query.findByOrderTagsIncludeAll){
    search.orderTags = search.orderTags || {};
    tags = query.findByOrderTagsIncludeAll.split(',');
    search.orderTags.$all =  tags;
  }
  tags = null;
  if (query.findByOrderTagsIncludeAny){
    search.orderTags = search.orderTags || {};
    tags = query.findByOrderTagsIncludeAny.split(',');
    search.orderTags.$in = tags;
  }
  tags = null;

// user
  if (query.findByUserCompany){
    search['user.userCompany'] = query.findByUserCompany;
  }
  if (query.findByUserDiscountRateGTE){
    search['user.userDiscountRate'] = search['user.userDiscountRate'] || {};
    search['user.userDiscountRate'].$gte = parseInt(query.findByUserDiscountRateGTE);
  }
  if (query.findByUserDiscountRateLTE){
    search['user.userDiscountRate'] = search['user.userDiscountRate'] || {};
    search['user.userDiscountRate'].$lte = parseInt(query.findByUserDiscountRateLTE);
  }

// item
  if (query.findByItemSupplier){
    search['item.itemSupplier'] = query.findByItemSupplier;
  }

  if (query.findByItemStockQuantityGTE){
    search['item.itemStockQuantity'] = search['item.itemStockQuantity'] || {};
    search['item.itemStockQuantity'].$gte = parseInt(query.findByItemStockQuantityGTE);
  }
  if (query.findByItemStockQuantityLTE){
    search['item.itemStockQuantity'] = search['item.itemStockQuantity'] || {};
    search['item.itemStockQuantity'].$lte = parseInt(query.findByItemStockQuantityLTE);
  }

  if (query.findByItemBasePriceGTE){
    search['item.itemBasePrice'] = search['itemBasePrice'] || {};
    search['item.itemBasePrice'].$gte = parseInt(query.findByItemBasePriceGTE);
  }
  if (query.findByItemBasePriceLTE){
    search['item.itemBasePrice'] = search['itemBasePrice'] || {};
    search['item.itemBasePrice'].$lte = parseInt(query.findByItemBasePriceLTE);
  }

  if (query.findByItemTagsIncludeAll){
    search['item.itemTags'] = search['item.itemTags'] || {};
    tags = query.findByItemTagsIncludeAll.split(',');
    search['item.itemTags'] = { $all: tags }
  }
  tags = null;
  if (query.findByItemTagsIncludeAny){
    search['item.itemTags'] = search['item.itemTags'] || {};
    tags = query.findByItemTagsIncludeAny.split(',');
    search['item.itemTags'] = { $in: tags }
  }
  tags = null;




  if (query.hasOwnProperty('limit')){
    limit = parseInt(query.limit);
  }else {
    limit = 100;
  }
  //console.log(search);
  return Order.find(search).sort({'orderDateTime': -1}).limit(limit).exec(function(err,data){
    console.log(err);
    //console.log(data);
  });
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

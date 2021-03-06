var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var search = require('./search');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/getOrder/:orderId', function(req, res, next){
  Order.find({orderId: req.params.orderId}, function(err, order){
    res.setHeader('Content-Type', 'application/json');
    if (err){ return res.json({
      result: true,
      data: error
    }); }
    if (!order) {
      return res.end(JSON.stringify({result: false,data: order}));
    }
    var result = {
      result: true,
      data: order
    };
    return res.end(JSON.stringify(result));
  })
});

router.get('/searchOrder', function(req, res){
  //console.time("db");
  res.setHeader('Content-Type', 'application/json');
  search(req.query).exec(function(err, data){
    if (err) { return res.end(JSON.stringify(err)); }
    //console.timeEnd("db");
    return res.end(JSON.stringify({
      result: true,
      data:data
    }));
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var search = require('./search');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getOrder/:orderId', function(req, res, next){
  Order.find({orderId: req.params.orderId}, function(err, order){
    if (err){ return res.status(404); }
    if (!order) { return res.status(404); }
    var result = {
      result: true,
      data: order
    };
    return res.status(200).send(result);
  })
});

router.get('/searchOrder', function(req, res){
  console.time("db");
  search(req.query).exec(function(err, data){
    if (err) { return res.status(200).send(err); }
    console.timeEnd("db");
    return res.status(200).send({
      result: true,
      data: data
    });
  });
});

module.exports = router;

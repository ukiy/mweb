var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var _ = require('lodash');
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
  console.log(req.query);
  search(req.query).then(function(data){
    if(data.error) {
      return res.status(404).send(data);
    }
    res.status(200).send({
      result: true,
      data: data
    });
  });
});

module.exports = router;

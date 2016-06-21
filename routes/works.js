"use strict";
var express = require('express');
var router = express.Router();
var pool= require('../model/connect');
/* GET users listing. */

router.get('/', function(req, res, next) {
  pool.query('select * from works',function(err,rows,fields){
     res.render('works',{workList:rows});
  })

});

module.exports = router;

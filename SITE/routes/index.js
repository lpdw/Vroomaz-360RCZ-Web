var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/command', function(req, res, next) {
  res.render('command');
});

router.get('/maze', function(req, res, next) {
  res.render('maze');
});

module.exports = router;

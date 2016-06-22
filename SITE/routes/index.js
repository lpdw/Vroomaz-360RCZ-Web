var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/manualCommand', function(req, res, next) {
  res.render('manualCommand');
});

router.get('/mazeResolution', function(req, res, next) {
  res.render('mazeResolution');
});

module.exports = router;

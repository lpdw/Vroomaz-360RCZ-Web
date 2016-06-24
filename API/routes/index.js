var express = require('express');
var router = express.Router();

/* index */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* FORWARD */
router.post('/forward', function(req, res) {

});

/* BACKWARD */
router.post('/backward', function(req, res) {

});

/* LEFT */
router.post('/left', function(req, res) {

});

/* RIGHT */
router.post('/right', function(req, res) {

});

/* STOP */
router.post('/stop', function(req, res) {

});

/* POST CONFIG */
router.post('/config', function(req, res) {
  if (req.accepts('application/json')) {
    return res.status(200).send(req.body);
  }
});

/* GET CONFIG */
router.get('/config', function(req, res) {

});

/* POST MODE */
router.post('/mode', function(req, res) {
  if (req.accepts('application/json')) {
    return res.status(200).send(req.body);
  }
});

/* GET MODE */
router.get('/mode', function(req, res) {

});

module.exports = router;

var express = require('express');
var router = express.Router();
//var controlServer = "http://172.1.24.122";
var controlServer = "http://requestb.in/1hag77w1";
var request = require('request');

/* index */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* FORWARD */
router.post('/start', function(req, res) {
  request.post(controlServer, function (error, response, body) {
    if (!error) {
      res.status(200).send({command: 'forward'});
    }
  });
});

/* BACKWARD */
router.post('/back', function(req, res) {
  request.post(controlServer, function (error, response, body) {
    if (!error) {
      res.status(200).send({command: 'backward'});
    }
  });
});

/* LEFT */
router.post('/left', function(req, res) {
  request.post(controlServer, function (error, response, body) {
    if (!error) {
      res.status(200).send({command: 'left'});
    }
  });
});

/* RIGHT */
router.post('/right', function(req, res) {
  request.post(controlServer, function (error, response, body) {
    if (!error) {
      res.status(200).send({command: 'right'});
    }
  });
});

/* STOP */
router.post('/stop', function(req, res) {
  request.post(controlServer, function (error, response, body) {
    if (!error) {
      res.status(200).send({command: 'stop'});
    }
  });
});

/* Mode auto */
router.post('/mode/auto', function(req, res) {
  request.post(controlServer, function (error, response, body) {
    if (!error) {
      res.status(200).send({command: 'auto mode'});
    }
  });
});

/* Mode line */
router.post('/mode/line', function(req, res) {
  request.post(controlServer, function (error, response, body) {
    if (!error) {
      res.status(200).send({command: 'auto mode'});
    }
  });
});

/* Mode manual command */
router.post('/mode/man', function(req, res) {
  request.post(controlServer, function (error, response, body) {
    if (!error) {
      res.status(200).send({command: 'manual mode'});
    }
  });
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

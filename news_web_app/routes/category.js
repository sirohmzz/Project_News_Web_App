var express = require('express');
var router = express.Router();
var connection = require('../database');

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM category', function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
    }
    res.json(results);
  });
});

module.exports = router;

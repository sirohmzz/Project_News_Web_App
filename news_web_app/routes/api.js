var express = require('express');
var router = express.Router();
var db = require('../database');

// API for getting news
router.get('/news', function(req, res) {
  db.query('SELECT * FROM News', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = router;

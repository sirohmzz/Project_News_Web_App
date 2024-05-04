var express = require('express');
var router = express.Router();
var connection = require('../database');

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM major', function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
    }
    res.json(results);
  });
});

router.post("/", function (req, res) {
  const { id, Level } = req.body;
  const query = 'INSERT INTO major (Major_Id , Major_Level) VALUES (?, ?)';
  connection.query(query, [id, Level], function(error, results) {
    if (error) {
      res.status(500).send(error.toString());
    } else {
      res.status(201).send('Major added successfully.');
    }
  });
});

router.delete('/:id', function(req, res) {
  const { id } = req.params;  

  if (!id) {
      return res.status(400).send('Major is required for deletion.');
  }

  const query = 'DELETE FROM major WHERE Major_Id = ?';
  connection.query(query, [id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Major found with the specified ID.');
      }
      res.send('Major deleted successfully.');
  });
});

router.put('/:id', function(req, res) {
  const { id } = req.params;  // Get the ID from the URL parameter
  const { Level } = req.body;

  const query = 'UPDATE major SET Major_Level = ? WHERE Major_Id = ?';
  connection.query(query, [Level ,id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No major found with the specified ID.');
      }
      res.send('Major updated successfully.');
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var connection = require('../database');

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM work_status', function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
    }
    res.json(results);
  });
});


router.post("/", function (req, res) {
  const { id, status } = req.body;
  
  const query = 'INSERT INTO work_status (Status_Id , Adm_Status) VALUES (?, ?)';
  connection.query(query, [id, status], function(error, results) {
    if (error) {
      res.status(500).send(error.toString());
    } else {
      res.status(201).send('work_status added successfully.');
    }
  });
});

router.delete('/:id', function(req, res) {
  const { id } = req.params;  

  if (!id) {
      return res.status(400).send('ID is required for deletion.');
  }

  const query = 'DELETE FROM work_status WHERE Status_Id = ?';
  connection.query(query, [id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No work_status found with the specified ID.');
      }
      res.send('Work_status deleted successfully.');
  });
});

router.put('/:id', function(req, res) {
  const { id } = req.params;  
  const { status } = req.body;

  const query = 'UPDATE work_status SET Adm_Status = ? WHERE Status_Id = ?';
  connection.query(query, [status , id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No work_status found with the specified ID.');
      }
      res.send('Work_status updated successfully.');
  });
});

module.exports = router;

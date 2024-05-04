var express = require('express');
var router = express.Router();
var connection = require('../database');

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM member', function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
    }
    res.json(results);
  });
});


router.post("/", function (req, res) {
  const { id, firstname, lastname, username, email, password, phonenumber, status } = req.body;

  const query = 'INSERT INTO member (Mem_Id, Mem_Fname, Mem_Lname, Mem_Username, Mem_Email, Mem_Password, Mem_Phone, Mem_Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [id, firstname, lastname, username, email, password, phonenumber, status], function(error, results) {
    if (error) {
      res.status(500).send(error.toString());
    } else {
      res.status(201).send('Member added successfully.');
    }
  });
});

router.delete('/:id', function(req, res) {
  const { id } = req.params;  

  if (!id) {
      return res.status(400).send('ID is required for deletion.');
  }

  const query = 'DELETE FROM member WHERE Mem_Id = ?';
  connection.query(query, [id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No member found with the specified ID.');
      }
      res.send('Member deleted successfully.');
  });
});

router.put('/:id', function(req, res) {
  const { id } = req.params;  // Get the ID from the URL parameter
  const { firstname, lastname, username, email, password, phonenumber, status } = req.body;

  const query = 'UPDATE member SET Mem_Fname = ?, Mem_Lname = ?, Mem_Username = ?, Mem_Email = ?, Mem_Password = ?, Mem_Phone = ?, Mem_Status = ? WHERE Mem_Id = ?';
  connection.query(query, [firstname, lastname, username, email, password, phonenumber, status, id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No member found with the specified ID.');
      }
      res.send('Member updated successfully.');
  });
});
module.exports = router;

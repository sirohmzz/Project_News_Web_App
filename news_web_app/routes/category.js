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


router.post("/", function (req, res) {
  const { id, name} = req.body;
  const query = 'INSERT INTO category (Cat_Id, Cat_Name ) VALUES (?, ?)';

  connection.query(query, [id, name], function(error, results) {
    if (error) {
      res.status(500).send(error.toString());
    } else {
      res.status(201).send('Category added successfully.');
    }
  });
});

router.delete('/:id', function(req, res) {
  const { id } = req.params;  

  if (!id) {
      return res.status(400).send('ID is required for deletion.');
  }

  const query = 'DELETE FROM category WHERE Cat_Id = ?';
  connection.query(query, [id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No category found with the specified ID.');
      }
      res.send('Category deleted successfully.');
  });
});

router.put('/:id', function(req, res) {
  const { id } = req.params;  // Get the ID from the URL parameter
  const { name } = req.body;

  // Check if all fields are provided
  if (!name) {
      return res.status(400).send('All fields are required.');
  }

  const query = 'UPDATE category SET Cat_Name = ? WHERE Cat_Id = ?';
  connection.query(query, [name, id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No category found with the specified ID.');
      }
      res.send('Category updated successfully.');
  });
});

module.exports = router;

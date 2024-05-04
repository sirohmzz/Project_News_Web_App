var express = require("express");
var router = express.Router();
var connection = require("../database");


router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM admin", function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
    }
    res.json(results);
  });
});

router.post("/", function (req, res) {
  const { id, firstname, lastname, username , email , password, phonenumber } = req.body;
  
  const query = 'INSERT INTO admin (Adm_Id, Adm_Fname, Adm_Lname, Adm_Username, Adm_Email, Adm_Password, Adm_Phone) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [id, firstname, lastname, username, email, password, phonenumber], function(error, results) {
    if (error) {
      res.status(500).send(error.toString());
    } else {
      res.status(201).send('Admin added successfully.');
    }
  });
});

router.delete('/:id', function(req, res) {
  const { id } = req.params;  

  if (!id) {
      return res.status(400).send('ID is required for deletion.');
  }

  const query = 'DELETE FROM admin WHERE Adm_Id = ?';
  connection.query(query, [id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No admin found with the specified ID.');
      }
      res.send('Admin deleted successfully.');
  });
});

router.put('/:id', function(req, res) {
  const { id } = req.params;  // Get the ID from the URL parameter
  const { firstname, lastname, username, email, password, phonenumber } = req.body;

  // Check if all fields are provided
  if (!firstname || !lastname || !username || !email || !password || !phonenumber) {
      return res.status(400).send('All fields are required.');
  }

  const query = 'UPDATE admin SET Adm_Fname = ?, Adm_Lname = ?, Adm_Username = ?, Adm_Email = ?, Adm_Password = ?, Adm_Phone = ? WHERE Adm_Id = ?';
  connection.query(query, [firstname, lastname, username, email, password, phonenumber, id], function(error, results) {
      if (error) {
          return res.status(500).send(error.toString());
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No admin found with the specified ID.');
      }
      res.send('Admin updated successfully.');
  });
});
// router.delete('/admin', function(req, res) {
//   const { id } = req.body;
//   if (!id) {
//       return res.status(400).send('ID is required.');
//   }

//   // ต่อไปคือการลบข้อมูล
//   const query = 'DELETE FROM admin WHERE id = ?';
//   connection.query(query, [id], function(error) {
//       if (error) {
//           return res.status(500).send(error.toString());
//       }
//       res.send('Deleted successfully.');
//   });
// });


module.exports = router;

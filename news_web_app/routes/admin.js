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
  if (!id || !firstname || !lastname || !username || !email || !password || !phonenumber) {
    return res.status(400).send("id are required.");
  }

  const query = 'INSERT INTO admin (Adm_Id, Adm_Fname, Adm_Lname, Adm_Username, Adm_Email, Adm_Password, Adm_Phone) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [id, firstname, lastname, username, email, password, phonenumber], function(error, results) {
    if (error) {
      res.status(500).send(error.toString());
    } else {
      res.status(201).send('Admin added successfully.');
    }
  });
});

module.exports = router;

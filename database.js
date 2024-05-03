var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'newsroot123456',
  database : 'news_app'
});

connection.connect();

module.exports = connection;

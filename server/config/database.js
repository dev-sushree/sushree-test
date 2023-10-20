'use strict';

const util = require('util');
const mysql = require('mysql2');

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sushree_test_db",
});

connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection;
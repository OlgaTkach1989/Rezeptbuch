// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'db_user',
  password: 'db_password',
  database: 'rezeptbuch_db'
});

module.exports = { pool };
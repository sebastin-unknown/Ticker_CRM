const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'locahost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'ticket_crm'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = db;
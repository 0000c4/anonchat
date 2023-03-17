const mysql = require('mysql2')
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "anonchat",
    password: "12345678"
}).promise();
module.exports = pool;

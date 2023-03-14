const mysql = require('mysql2')
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "anonchat",
    password: "12345678"
}).promise();
pool.query("CREATE DATABASE if not exists anonchat")
.then(result =>{
    pool.query("use anonchat").then( ()=>{
    pool.query("create table if not exists private(id int primary key auto_increment,name varchar(255) not null,password varchar(30) not null,time varchar(100) default null)")})
  })
  .catch(err =>{
    console.log(err);
  });
  module.exports = pool;

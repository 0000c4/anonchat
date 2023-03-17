//start this file for first time
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678"
}).promise();
pool.query("CREATE DATABASE if not exists anonchat")
.then(result =>{
    pool.query("use anonchat").then( ()=>{
    pool.query("create table if not exists private(id int primary key auto_increment,name varchar(255) not null,password varchar(255) not null,time varchar(100) default null)")
    pool.query("create table if not exists public(id int primary key auto_increment,name varchar(255) not null")
    })
    
  })
  .catch(err =>{
    console.log(err);
  });
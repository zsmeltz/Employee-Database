var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3500,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "employeesDB"
  });

  connection.connect(function(err){
      if(err) throw err;
      console.log("Connected as id " + connection.threadId + "\n");
  });


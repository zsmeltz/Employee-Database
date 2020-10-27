var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console.table');

// var connection = mysql.createConnection({
//     host: "localhost",
  
//     // Your port; if not 3306
//     port: 3500,
  
//     // Your username
//     user: "root",
  
//     // Your password
//     password: "root",
//     database: "employeesDB"
//   });

//   connection.connect(function(err){
//       if(err) throw err;
//       console.log("Connected as id " + connection.threadId + "\n");
//   });

initialPrompt();

function initialPrompt(){
    var options = {
        type: "list",
        message: "What would you like to do?",
        choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add employee", "Remove employee", "Update employee role", "Update employee manager", "View all roles", "View all departments", "Add role", "Remove role", "EXIT"],
        name: "Option Menu"
    };
    inquirer.prompt(options).then(function(res, err) {
        if(err) throw err;

        if(res === "EXIT"){
            console.clear();
        }
        
    })
};
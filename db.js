var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console.table');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: "root",
//     password: "",
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
    inquirer.prompt(options).then(function(err, res) {
        if(err) throw err;

        if(res === "EXIT"){
            console.clear();
        };
        if(res === "View all employees" || res === "View all employees by manager" || res === "View all roles" || res === "View all departments"){
            readTable(res);
        }
        
        if(res === 'Add employee' || res === 'Remove employee'){
            configEmployee(res);
        }
        
        if(res === "Update employee role" || res === "Update employee manager"){
            update(res);
        }
        
        if(res === "Add role" || res === "Remove role"){
            configRole(res);
        }
        
    });
};

function readTable(res){
//connection.query("SELECT * FROM employee")
    console.log(res);
    if(res === "View all employees"){

    }
    
    if(res === "View all employees by department"){

    }
 //displays the table with all employees
//prompt and ask which department, then view all employees under that dept
//prompt and ask which manager, then view all employees under that manager
 //"View all roles", "View all departments"
 //views all departments via table
 //views all the roles via table
 
    if(res === "View all employees by manager"){

    }
   
    if(res === "View all roles"){

    }

    if(res === "View all departments"){

    }

};

function configEmployee(res){
    if(res === 'Add employee'){
//prompts and asks what name, last name, role
    }
    if(res === 'Remove employee'){
//prompts and asks which employee, lists them all. When you select, it deletes that row from the db. 
    }
};

function update(res){
    //"Update employee role", "Update employee manager"
    if(res === "Update employee role"){
//prompts and asks which employee, asks what role it wants to change it to. responds with confirmation of role update
    }
    if(res === "Update employee manager"){
//prompts and asks which employee, asks which manager it would like to switch to, responds with confirmation of manager update
    }
}

function configRole(res){
    if(res === "Add role"){
//prompts for an input of name of new role, input of salary, and gives a list and asks which department it will belong to
    }
    if(res === "Remove role"){
//asks if the user is sure it wants to delete a row. If yes, deletes a role row and responds with confirmation. if no, returns back to main menu
    }
}
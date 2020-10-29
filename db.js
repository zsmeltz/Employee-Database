var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console.table');
var express = require('express');

var app = express();
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "password",
    database: "employeesDB"
  });

var PORT = process.env.PORT || "3306";

  connection.connect(function(err){
      if(err) throw err;
      console.log("Connected as id " + connection.threadId + "\n");
  });

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

async function readTable(res){
//connection.query("SELECT * FROM employee")
    console.log(res);
    if(res === "View all employees"){
//displays the table with all employees
//app.get('/employee',)
//connection.query("SELECT * FROM employee");
    }
    if(res === "View all employees by department"){
//prompt and ask which department, then view all employees under that dept
        inquirer
            prompt = {
                type: 'list',
                message: "Which department?",
                choices: ["Engineering", "Sales", "Finances", "Legal"],
                name: "departments"
            }.then(function(err, res){
                if (err) throw err;

                if(res === "Engineering"){
                    
                }
                if(res === "Sales"){
                    
                }
                if(res === "Finances"){
                    
                }
                if(res === "Legal"){
                    
                }
            });
    }

    if(res === "View all employees by manager"){

//prompt and ask which manager, then view all employees under that manager
        
         inquirer
            prompt = [{
                type: 'list',
                message: 'Which manager?',
                choices: [],
                name: "underManager"
            }].then(function(err, res){
                if (err) throw err;
                //if statements based on which manager they choose
            })
    }
   
    if(res === "View all roles"){
 //views all the roles via table
 app.get('/', function(req, res){
     connection.query("SELECT * FROM emp_role", function(err, result){
         if (err) throw err;
         console.log(consoleTable(result));
     })
 })
    }

    if(res === "View all departments"){
        connection.query("SELECT * FROM department", function(err, result){
            if (err) throw err;
            console.log(consoleTable(result));
        })
    }

};

function configEmployee(res){
    if(res === 'Add employee'){
//prompts and asks what name, last name, role
        inquirer
            prompt = [
                {
                    type: "input",
                    message: "New employee first name?",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "New employee last name?",
                    name: "last_name"
                },
                {
                    type: 'list',
                    message: "New employee role: ",
                    choices: ["Lead Engineer", "Software Engineer", "Sales Lead", "Salesperson", "Finance Manager", "Accountant", "Legal Team Lead", "Lawyer"],
                    name: "role_id"
                }
            ].then(function(err, res){
                if (err) throw err;
                connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?)", [res.first_name, res.last_name, res.role_id], (err) => {if(err) throw err});
                console.log("Your new employee has been saved.")
                //adds the combination of inputs to a single object and adds to table
            }).catch(err=>{console.log(err)})
    };

    if(res === 'Remove employee'){
//prompts and asks which employee, lists them all. When you select, it deletes that row from the db.
        inquirer
            prompt = [{
                type: 'list',
                message: "Which employee do you want to delete?",
                choices: [], //list of employees based on the table employee
                name: 'deleteEmployee'
            },{
                type: 'confirm',
                message: "Are you sure you want to delete this employee?",
                name: 'confirmDeleteEmployee'
            }
        ].then(function(err, res){
            if(err) throw err;
            //deletes a row from employee based on the one they chose to delete
        }).catch(err=>{console.log(err)})
    }


};

async function update(res){
    if(res === "Update employee role"){
        let choices = await connection.query("select firstname,lastname from employee", function(err, resp) {
           console.log(resp) 
           return resp;
        })
//prompts and asks which employee, asks what role it wants to change it to. responds with confirmation of role update
        inquirer
            prompt = [
                {
                    type: "list",
                    message: "Which employee?",
                    choices: [choices],
                    name: 'employeeSelect'
                },
                {
                    type: 'list',
                    message: "What would you like to change their role to?",
                    choices: [],
                    name: 'updateRole'
                }
            ].then(function(err, res){
                if (err) throw err;
                console.log("Successfully updated employee role");
                //UPDATES that employees role to a different role

            }).catch(err=>{console.log(err)})
    }
    if(res === "Update employee manager"){
//prompts and asks which employee, asks which manager it would like to switch to, responds with confirmation of manager update
        inquirer
            prompt = [
                {
                    type: "list",
                    message: "Which employee would you like to have a different manager?",
                    choices: [],
                    name: 'employeeSelect'
                },
                {
                    type: 'list',
                    message: "Which manager would you like to switch to?",
                    choices: [],
                    name: 'managerSelect'
                },
                {
                    type: 'confirm',
                    message: "Are you sure you want to make these changes?",
                    name: 'confirmChange'
                }
            ].then(function(err, res){
                if (err) throw err;
                
            }).catch(err=>{console.log(err)})
    }
};

function configRole(res){
    if(res === "Add role"){
//prompts for an input of name of new role, input of salary, and gives a list and asks which department it will belong to
        inquirer
            prompt = [
                {
                    type: "input",
                    message: "Enter new role name: ",
                    name: 'newRoleName'
                },
                {
                    type: "input",
                    message: "Enter new role salary: ",
                    name: 'newRoleSalary'
                },
                {
                    type: 'list',
                    message: "Which department would you like to add this role to?",
                    name: 'addToDepartment'
                }
            ].then(function(err, res){
                if (err) throw err;
            }).catch(err=>{console.log(err)})
    }
    if(res === "Remove role"){
//asks if the user is sure it wants to delete a row. If yes, deletes a role row and responds with confirmation. if no, returns back to main menu
        inquirer
            prompt = [
                {
                    type: 'list',
                    message: "Which role do you want to remove?",
                    choices: [],
                    name: 'roleSelection'
                },
                {
                    type: 'confirm',
                    message: 'Are you sure you want to remove this role?',
                    name: 'removeConfirm'
                }
            ].then(function(err, res) {
                if (err) throw err;

            }).catch(err=>{console.log(err)})
    }
};

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
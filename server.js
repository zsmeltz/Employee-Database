var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleToTable = require('console.table');



var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "password",
    database: "employeesDB"
  });



  connection.connect(function(err){
      if(err) throw err;
      console.log("Connected as id " + connection.threadId + "\n");
      initialPrompt();
  });



function initialPrompt(){

    var options = {
        type: "list",
        message: "What would you like to do?",
        choices: ["View all employees", "View all departments", "View all roles", "Add employee", "Remove employee", "Update employee role", "View all roles", "View all departments", "Add role", "Remove role", "EXIT"],
        name: "options"
    };

    inquirer.prompt(options).then(function(res) {
       

        if(res.options === "EXIT"){
            console.clear();
            console.log("Have a nice day!");
        };
        if(res.options === "View all employees" || res.options === "View all departments" || res.options === "View all roles"){
            console.log(res.options);
            readTable(res.options);
        }
        
        if(res.options === 'Add employee' || res.options === 'Remove employee'){
            console.log(res.options);
            configEmployee(res.options);
        }
        
        if(res.options === "Update employee role" || res.options === "Update employee manager"){
            console.log(res.options);
            update(res.options);
        }
        
        if(res.options === "Add role" || res.options === "Remove role"){
            console.log(res.options);
            configRole(res.options);
        }
        
    }).catch((err) => console.log(err));
};

 function readTable(res){
        console.log('Im here in readTable');
        console.log(res);
            if(res === "View all employees"){
                console.log("Im in 'View all employees' ");
            connection.query("SELECT * FROM employee", function(err,rows){
            
                console.table(rows)
                initialPrompt();
            });    
        }
      
        
        if(res === "View all roles"){
            console.log("Im here in view all roles");
            connection.query("SELECT * FROM emp_role", function(err,rows){
                
                console.table(rows)
                initialPrompt();
            });
        }
    
        if(res === "View all departments"){
            connection.query("SELECT * FROM department", function(err,rows){
                
                console.table(rows)
                initialPrompt();
            });
        }
    
};

async function configEmployee(res){
    if(res === 'Add employee'){

        let rollIds = [];
        let parms = [];
        let role_name ='';
           connection.query("select title from emp_role", async function (err,rows) { 
                if(Array.isArray(rows)) {
                    for(var i in rows) {
                        rollIds.push(rows[i].title)
                    }
                }
                var addEmployee = [
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
                        message: "New Employee role: ",
                        choices: rollIds,
                        name: "role_id"
                    }
                ]; 

                await inquirer.prompt(addEmployee).then(function(res){
                    parms.push(res.first_name)
                    parms.push(res.last_name)
                    role_name = res.role_id
                 }).catch(err=>{console.log(err)});
     
                 connection.query("select id from emp_role where title = ? ", role_name, function(err,rows){  
                    parms.push(rows[0].id)
                    connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)", parms ,function(err,results, fields){ console.log(err);
                        console.log("Your new employee has been saved.")
                        initialPrompt();
                        }); 
                });

            });    
    };

    if(res === 'Remove employee'){
        
        let names = [];
        connection.query("select first_name, last_name from employee", async function (err,rows) {
         if (err) console.log(err);
            
        if(Array.isArray(rows)) {
            for(var i in rows) {
                names.push(rows[i].first_name);
            }
            console.log('names is', names)
            var delEmp = [{
                type: 'list',
                message: "Which employee do you want to delete?",
                choices: names,
                name: 'deleteEmployee'
            }
        ];
       await inquirer.prompt(delEmp).then(async function(res){
            if(err) throw err;
            
             connection.query("DELETE FROM employee WHERE first_name = ?", res.deleteEmployee, function(err,results, fields){ 
                if (err) console.log(err);
                console.log("Your employee has been removed.");
                initialPrompt();
                }); 
          
        }).catch(err=>{console.log(err)})
     }
    });
    
       
    }
};

async function update(res){
    if(res === "Update employee role"){
        let names = [];
           connection.query("select first_name from employee", async function (err,rows) { 
                if(Array.isArray(rows)) {
                    for(var i in rows) {
                        names.push(rows[i].first_name)
                    }
                }


//prompts and asks which employee, asks what role it wants to change it to. responds with confirmation of role update
     var updateRole = [
                {
                    type: "list",
                    message: "Which employee?",
                    choices: names,
                    name: 'employeeSelect'
                },
                {
                    type: 'list',
                    message: "What would you like to change their role to?",
                    choices: [1,2,3,4,5,6,7,8],
                    name: 'updateRole'
                }
            ];
           await inquirer.prompt(updateRole).then(function(res){
                
                connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.updateRole, res.employeeSelect], async function(err,results, fields){
                    if (err) throw err;
                    console.log("Successfully updated employee role");
                    initialPrompt();
                });
            }).catch(err=>{console.log(err)});
    });
    
};

};

async function configRole(res){
    if(res === "Add role"){

        var newRole = [
                {
                    type: "input",
                    message: "Enter new role name: ",
                    name: 'newRoleTitle'
                },
                {
                    type: "input",
                    message: "Enter new role salary: ",
                    name: 'newRoleSalary'
                },
                {
                    type: 'list',
                    message: "Which department would you like to add this role to?",
                    choices: [1 , 2 , 3 , 4],
                    name: 'addToDepartment'
                }
            ]
            inquirer.prompt(newRole).then(function(res){
                connection.query("INSERT INTO emp_role (title, salary, dept_id) VALUES (?,?,?)", [res.newRoleTitle, res.newRoleSalary, res.addToDepartment], function(err, results, fields){
                    if(err) throw err;
                    console.log("Added new role to emp_roles table.");
                    initialPrompt();
                })
            }).catch(err=>{console.log(err)})
    }
    if(res === "Remove role"){
//asks if the user is sure it wants to delete a row. If yes, deletes a role row and responds with confirmation. if no, returns back to main menu
    let roles = [];
           connection.query("select title from emp_role", async function (err,rows) { 
                if(Array.isArray(rows)) {
                    for(var i in rows) {
                        roles.push(rows[i].title)
                    }
                }
        var removeRole = [
                {
                    type: 'list',
                    message: "Which role do you want to remove?",
                    choices: roles,
                    name: 'roleSelection'
                },
                {
                    type: 'confirm',
                    message: 'Are you sure you want to remove this role?',
                    name: 'removeConfirm'
                }
            ];
            inquirer.prompt(removeRole).then(function(res) {
                connection.query("DELETE FROM emp_role WHERE title = ?", res.roleSelection, async function(err, result){
                    if(err) throw err;
                    console.log("The role you selected has been removed.");
                    initialPrompt();
                })

            }).catch(err=>{console.log(err)})
    });
}
};
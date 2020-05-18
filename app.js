var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "rootpass",
    database: "employee_trackerDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    startApp();
  });

  function startApp(){
    inquirer.prompt({
        name:"action",
        type:"list",
        message:"Welcome to Employee-tracker app",
        choices:["Add", "View", "Update", "Delete", "Exit"]
    }).then(function(res){
        switch (res.action) {
            case "Add":
                initAdd();
                break;

            case "View":
                initView();
                break;

            case "Update":
                initUpdate();
                break;

            case "Delete":
                initDelete();
                break;

            case "Exit":
                break;

        }
    })
  

  function initAdd(){
      inquirer.prompt({
          name:"add",
          type:"list",
          message:"What would you like to add?",
          choices:["Add Employee", "Add Department", "Add Role", "Go Back", "Exit"]
      }).then(function(res){
        switch (res.add) {
            case "Add Employee":
                addEmployee();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Go Back":
                startApp();
                break;

            case "Exit":
                break;

        }
      })
  }

  function addEmployee(){
      inquirer.prompt([
          {
              name:"firstName",
              type:"input",
              message:"Employee's first name?"
          },
          {
              name:"lastName",
              type:"input",
              message:"Employee's last name?"
          }
      ]).then(function(answer){
          connection.query = ("select first_name, last_name from employee where ?",
          {
              first_name: answer.firstName,
              last_name: answer.lastName
          }, function(err, res){
              if(err) throw err;
              console.log("Employee successfully added to database!!")
          });

      }); 
    };

  function initView(){
    inquirer.prompt({
        name:"view",
        type:"list",
        message:"What would you like to add?",
        choices:["View Employee", "View Department", "View Role","Go Back", "Exit"]
    }).then(function(res){
      switch (res.view) {
          case "View Employee":
              viewEmployee();
              break;

          case "View Department":
              viewDepartment();
              break;

          case "View Role":
              viewRole();
              break;

          case "Go Back":
              startApp();
              break;

          case "Exit":
              break;

      }
    })
}

function initUpdate(){
    inquirer.prompt({
        name:"update",
        type:"list",
        message:"What would you like to add?",
        choices:["Update Employee", "Update Managment", "Update Role","Go Back", "Exit"]
    }).then(function(res){
      switch (res.update) {
          case "Update Employee":
              updateEmployee();
              break;

          case "Update Managment":
              updateManagment();
              break;

          case "Update Role":
              updateRole();
              break;

          case "Go Back":
               startApp();
               break;

          case "Exit":
              break;

      }
    })
}

function initDelete(){
    inquirer.prompt({
        name:"delete",
        type:"list",
        message:"What would you like to add?",
        choices:["Delete Employee", "Delete Managment", "Delete Role","Go Back", "Exit"]
    }).then(function(res){
      switch (res.delete) {
          case "Delete Employee":
              deleteEmployee();

          case "Delete Managment":
              deleteManagment();

          case "Delete Role":
              deleteRole();

          case "Go Back":
              startApp();
              break;

          case "Exit":
              break;

      }
    })
}



}
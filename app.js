var mysql = require("mysql");
var inquirer = requirre("inquirer");


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
        name:"department",
        type:"list",
        message:"Welcome to Employee-tracker app",
        choices:["Add", "View", "Update", "Delete", "Exit"]
    }).then(function(res){
        switch (res) {
            case "Add":
                initAdd();

            case "View":
                initView();

            case "Update":
                initUpdate();

            case "Delete":
                initDelete();

            case "Exit":
                break;

        }
    })
  }
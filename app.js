const mysql = require("mysql");
const inquirer = require("inquirer");

// ovdje cemo deklarirati variablu connection i definirati je tako da cemo ugadenom funkcijom mysql.createConnection gdje smo konfigurirali svojstva port, user, password i database

const connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "Vanessa0319",
    database: "employeeTracker_db"
});
// console.log(connection)

// zatim smo ponovno pozvali variablu connection te metodom       .connect()  definirali anonimnu funkciju da nam vrati greskuako je greska istinita

connection.connect(function(err){
    if(err){
        throw err;
        console.log("err connecting... " + err)
    }
});
console.log("here line 22")

//ovdje smo pozvali funkciju kojom cemo izabrati hocemo li dodati isprintati, update ili izaci iz programa
getJob();

function getJob(){
    inquirer.prompt({
        name: "job",
        type: 'checkbox',
        message: "What would you like to do?",
        choices: ["add", "view", "update", "exit"]

    }).then(function({job}){
        switch(job){
            case "add":
                add();
                break;
            case "view":
                view();
                break;
            case "update":
                update();
                break;
            case "exit":
                connection.end();
                return;
        }
    })

    
}
  

// ovdje cemo napraviti funkciju kojom cemo dodati zaposlenika

function add(){
    inquirer.prompt({
        name: "db",
        message: "What would you like to add?",
        type: "checkbox",
        choices: ["department", "role", "employee"]

    }).then(function({db}){
        console.log(db)
        switch(db){
            case "department":
                add_department();
                break;
            case "role":
                add_role();
                break;
            case "employee":
                add_employee();
                break;
        }
    })

}

console.log("here line 77")

//ovdje cemo otvoriti funkciju u slucaju da korisnik odabere add department

function add_department(){
    inquirer.prompt(
        {
            name: "name",
            message: "What is th Department's name?",
            type: "input"
        }

    ).then(function({name}){
        connection.query(`insert into department (name) values ("${name}")`, function(err, data){
            if(err){
                throw err;
                console.log(err)
            }
            getJob();
            console.log("Department added")
            console.log(data)
        })
    })
}
 
 // ovdje cemo otvoriti funkciju koja u slucaju da korisnik odamere add_role

 function add_role(){
     let departments = [];
     connection.query(`select * from department`, function(err, data){
         if(err){
             throw err;

         }

         for(let i = 0; i <data.length; i++){
             //loop kojim ispisuemo imena svih departmenta

             departments.push(data[i].name);
         }
         inquirer.prompt([
             {
                 name: "position",
                 message: "What is your role?",
                 type: "input"
             },
             {
                 name: "salary",
                 message: "What is your salary?",
                 type: "input"
             },
             {
                 name: "department_id",
                 message: "Which department does it belong to?",
                 type: "list",
                 choices: departments
             }
         ]).then(function({position, salary, department_id}){

             let index = departments.indexOf(department_id);
             connection.query(`insert into role(title, salary, department_id) values ("${position}", "${salary}", "${index}")`, function(err, data){
                 if(err){
                     throw err;
                     console.log("role is added")
                 }
                 getJob();
             })

         })

     })
 }//nastavi

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
    });
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
const mysql = require("mysql");
const inquirer = require("inquirer");

// ovdje cemo deklarirati variablu connection i definirati je tako da cemo ugadenom funkcijom mysql.createConnection gdje smo konfigurirali svojstva port, user, password i database

const connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "rootpass",
    database: "Employee_tracker_DB"
});
// console.log("linija 12  " + connection)

// zatim smo ponovno pozvali variablu connection te metodom       .connect()  definirali anonimnu funkciju da nam vrati greskuako je greska istinita

connection.connect(function(err){
    if(err){
        throw err;
    }
});


//ovdje smo pozvali funkciju kojom cemo izabrati hocemo li dodati isprintati, update ili izaci iz programa
startApp();

function startApp(){
    inquirer.prompt([
        {
            name:"action",
            type:"list",
            message:"What action would you like to take?",
            choices:["Add", "View", "Update", "Delete", "Exit"]
        }
    ])
    .then(answer =>{
        switch (answer.action) {
            case "Add":
                add();
                break;

            case "View":
                view();
                break;

            case "Update":
                update();
                break;

            case "Delete":
                deleteOption();
                break;

            case "Exit":
                connection.end();
        }
    })
    
}

// ovdje cemo napraviti funkciju kojom cemo dodati zaposlenika

function add(){
    inquirer.prompt({
        name: "db",
        message: "What would you like to add?",
        type: "list",
        choices: ["department", "role", "employee"]

    })
    // .then(function({db}){
    //     console.log(db)
    //     switch(db){
    //         case "department":
    //             add_department();
    //             break;
    //         case "role":
    //             add_role();
    //             break;
    //         case "employee":
    //             add_employee();
    //             break;
    //     }
    // })
    .then(res =>{
        console.log(res)
        switch (res.db) {
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
    // add();
}
// console.log("here line 77")

//ovdje cemo otvoriti funkciju u slucaju da korisnik odabere add department

function add_department(){
    inquirer.prompt(
        {
            name: "department_name",
            message: "What is th Department's name?",
            type: "input"
        }

    )
    // .then(function({name}){
    //     connection.query(`insert into department (name) values ("${name}")`, function(err, data){
    //         if(err){
    //             throw err;

    //         }
    //         getJob();
    //         console.log("Department added")
    //         console.log(data)
    //     })
    // })
    .then(res =>{
        connection.query(`insert into department (department_name) values ('${res.department_name}')`, function(err, data){
            if(err) throw err;
            console.log("Department added")
            console.log(data)

        });
    });
};
 
 // ovdje cemo otvoriti funkciju koja u slucaju da korisnik odamere add_role

 function add_role(){
     let departments = [];
     connection.query(`select * from department`, function(err, data){
         if(err){
             throw err;

         }

         for(let i = 0; i <data.length; i++){
             //loop kojim ispisuemo imena svih departmenta

             departments.push(data[i].department_name);
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
         ])
        //  .then(function({position, salary, department_id}){

        //      let index = departments.indexOf(department_id);
        //      connection.query(`insert into role(title, salary, department_id) values ("${position}", "${salary}", "${index}")`, function(err, data){
        //          if(err){
        //              throw err;

        //          }
        //      })

        //  })
        .then(res =>{
            let deptIndex = departments.indexOf(res.department_id);
            connection.query(`insert into role(title, salary, department_id) values ("${res.position}", "${res.salary}", "${deptIndex}")`, function(err, data){
                if(err) throw err;
                // console.log(res, data, deptIndex)
                console.log("Role successfully added!")
            })
        })

     })
 }

 // ovdje cemo staviti funkciju kojom dodajemo zaposlenike i pozicije na kojima rade

 function add_employee(){

    let employees = [];
    let roles = [];

    connection.query(
        `select * from employee`, function(err, data){
        if(err){
            throw err;
        }
        for(let i = 0; i < data.length; i++){
            employees.push(data[i].first_name);
            roles.push(data[i].role_id);
        }
        console.table(employees,)

         inquirer.prompt([
             {
                 name: "first_name",
                 message: "What's is the employees First Name?",
                 type: "input"
             },
             {
                 name: "last_name",
                 message: "What's is the employees Last Name?",
                 type: "input"
             },
             {
                 name: "role_id",
                 message: "What is employees role?",
                 type: "input",

             }
            //  {
            //      name: "managerID",
            //      message:"Who is your department head?",
            //      type: "list",
            //      choices:["none"].concat(employees)

            //  }
         ])
        //  .then(function({first_name, last_name, role_id, manager_id}){
        //      let queryTxt = `insert into employee(first_name, last_name, role_id)`;
        //      if(manager_id != "none"){
        //          queryTxt += `values ("${first_name}", "${last_name}", ${roles.indexOf(role_id)}`;
        //      }
        //      console.log(queryTxt)

        //      connection.query(queryTxt, function(err, data){
        //          if(err) throw err;
        //          console.table(data)
        //         //  getJob();
        //      })
        //  })
        .then(res =>{ 
            let roleIndex = roles.indexOf(res.role_id);
            console.log(roleIndex)
            connection.query(`insert into employee(first_name, last_name, role_id) values ("${res.first_name}", "${res.last_name}", "${roleIndex}")`, function(err, data){
                if(err) throw err;
                console.log(res, data, roleIndex)
                console.log("employee successfully added!")
            });
        });
        
        });
    }

    // ovdje cemo staviti funkciju ako korisnik odabere pregled

    function view(){
        inquirer.prompt(
            {
                name: "db",
                message: "What would you like to view?",
                type: "list",
                choices: ["department", "role", "employee","View Teams", "View Managment"]
            }
        )
        // .then(function({db}){
        //     connection.query(`select * from ${db}`, function(err, data){
        //         if(err){
        //             throw err;
        //         }
        //         console.table(data)
        //     })

        // })
        .then(res =>{
            switch (res.db) {
                case "department":
                    connection.query(`SELECT * FROM ${res.db}`, function(err, data){
                        if(err) throw err;
                        console.table(data)
                    })
                    connection.query(`SELECT department_name FROM department INNER JOIN role on department.department_id - role.department_id ;`, function(err, data){
                        if(err) throw err;
                        console.table(data)
                    }) 

            }
        })
        // connection.query(`select department_name from department inner join role on department.department_id = role.department_id;`, function(err, data){
        //     if(err) throw err;
        //     console.table(data)
        // })
    }

    //ovdje cemo otvoriti funkciju za update 

    function update(){
        inquirer.prompt(
            {
                name: "update",
                message: "What would you like to update?",
                type: "list",
                choices: ["role", "manager"]
            }

        ).then(function({update}){
            switch(update){
                case "role":
                    update_role();
                    break;
                case "manager":
                    update_manager();
                    break;
            }
        })
    }

    //ovdje cemo otvoriti funkciju za update role

     function update_role(){
         connection.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id ;`, function(err,data, field){
             if(err) throw err;
            //  console.log(data,  field)
             var employees = [];

             var roles = [];

             for(let i = 0; i < data.length; i++){
                 employees.push(data);
                 roles.push(data[i].title) 
             }
             for(let i = 0; i < data.length; i++){

             }
             console.log("linija 318", employees, roles)

             inquirer.prompt([
                 {
                     name:"emply",
                     message:"Wich employee is getting updated",
                     type:"list",
                     choices: employees
                 },
                 {
                     name:"role",
                     message:"What role are you assigning the employee?",
                     type:"list",
                     choices: roles

                 }
             ])
             .then(res =>{
 
                 var sql = `UPDATE role SET title = ? , role_id = ? , where role_id = ?`;
                 var query = connection.query(sql,[`${res.role}, ${res.role_id}`], function(err, result){
                     if(err) throw err;
                     console.log(result)
                 })
                 connection.query(`UPDATE employee set title = ${res.role} where first_name = ${res.emply} `, function(err, data){
                     if(err) throw err;
                     console.log("You Successfully updated a role!!")
                 })

             })
      
         })
     }



    //ovdje cemo otvoriti funkciju za manager update

    function update_manager(){


        connection.query(`select * from employee`, function(err, data){
            if(err){
                throw err;
            }
            let employees = [];
            for(let i = 0; i < data.length; i++){
                employees.push(data[i].first_name)
            }

            inquirer.prompt([
                {
                    name: "employee_id",
                    message: "Which employee would you like update?",
                    type: "list",
                    choices: employees
                },
                {
                    name: "manager_id",
                    message: "Who is the new manager?",
                    type: "list",
                    choices: ["none"].concat(employees)
                }

            ])
            // .then(({employee_id, manager_id}) => {

            //     let queryTxt = "";
            //     if(manager_id !== "none"){
            //         queryTxt = `update employee set manager_id = ${employees.indexOf(manager_id) + 1} where id = ${employees.indexOf(employee_id) + 1}`
            //     } else {
            //         queryTxt = `update employee set manager_id = ${null} where id = ${employees.indexOf(employee_id) + 1}`
            //     }

            //     connection.query(queryTxt, function(err, data){
            //         if(err){
            //             throw err;
            //         }
            //         // getJob();
            //     })
            // })
            .then(res =>{
                if(employees.includes(res.manager_id)){
                    console.log(res)
                }
            })
        });
    }

    function deleteOption(){
        // console.log("helo")
        // delete department
        // delete role
        // delete employee
        var sql = connection.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id ;`, function(err,data, field){
            if(err) throw err;

        var employees = [];
        var roles = [];
        var department = [];
        for(let i = 0; i <data.length; i++){
            employees.push(data[i].first_name);
            roles.push(data[i].titles);
            department.push(data[i].department_name);
        };

        
        inquirer.prompt([
            {
                name:"deleteDepartment",
                message:"Wich Dept would you like to remove?",
                type:"list",
                choices:["Research", "Accounting", "Development"]
            },
            {
               name:"deleteRole",
               message:"Which role would you like to remove?",
               type:"list",
               choices:["Intern", "Engineer", "Manager",] 
            },
            {
                name:"deleteEmployee",
                message:"Wich employee would you like to remove?",
                type:"list",
                choices: ["None"].concat(employees)
            }
        ])
        .then(res =>{
            switch (res.deleteDepartment) {
                case "Research":
                    connection.query(`DELETE FROM department where department_id = 3`);
                    break;

                case "Accounting":
                    connection.query(`DELETE FROM accounting where department_id = 2`);
                    break;

                case "Development":
                    connection.query(`DELETE FROM development where department_id = 1`);
                    break;

            }

            switch (res.deleteRole) {
                case "Intern":
                    connection.query(`DELETE FROM role where role_id = 3`);
                    break;

                case "Engineer":
                    connection.query(`DELETE FROM role where role_id = 2`);
                    break;

                case "Manager":
                    connection.query(`DELETE FROM role where role_id = 1`);
                    break;
  
            }
            if(res.deleteEmployee){
                connection.query(`DELETE FROM employee where employee_id = ${res.deleteEmployee}`);
                break;
            }
        })

    }) 

    }
insert into department(name)
values( "Payroll"),
( "Dev"),
( "IT");


insert into role(title, salary, department_id)
values("Accountant", 45000.00, 1),
("Payroll Admin", 55000.00, 1),
("Sr. Developer", 75000.00, 2),
("Jr. Developer", 60000.00, 2),
("Networking engineer", 65000.00, 3),
("Helpdesk Tech", 50000,3);

insert into employee(first_name, last_name, role_id)
values("Mario", "Kozic", 1),
("Tomislav", "Kozic", 2),
("Robert", "Maric", 3),
("Filip", "Jurisic", 4),
("Ivan", "Loncar", 5),
("Tod", "Dudek", 6);

-- INSERT INTO department (department_name)
-- VALUES ("Develop");
-- INSERT INTO department (department_name)
-- VALUES ("Accounting");
-- INSERT INTO department (department_name)
-- VALUES ("Research");
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Manager", 200000, 1);
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Engineer", 100000, 2);
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("intern", 5000, 3);
-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ("Marko","Dundovic", 2);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Mario", "Kozic", 3, 1);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Tomislav", "Kozic", 1, 2);
-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ("Milan", "Soco", 3);


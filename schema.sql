DROP DATABASE IF EXISTS Employee_tracker_DB;
CREATE database Employee_tracker_DB;
USE Employee_tracker_DB;
 
CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) not NULL,
  PRIMARY KEY (department_id)
);
CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) not NULL,
  salary DECIMAL(30,2) not NULL,
  department_id INT,
  PRIMARY KEY (role_id)

);
CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) not NULL,
  last_name VARCHAR(30) not NULL,
  role_id INT not NULL,
  manager_id INT,
  PRIMARY KEY (employee_id)

);

INSERT INTO department (department_name)
VALUES ("Develop");
INSERT INTO department (department_name)
VALUES ("Accounting");
INSERT INTO department (department_name)
VALUES ("Research");
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("intern", 5000, 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Marko","Dundovic", 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mario", "Kozic", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tomislav", "Kozic", 1, 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Denis", "Demirovski", 2, );
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Milan", "Soco", 3);

select from roles cross join employees;

-- replace into employee(first_name, last_name)
-- values("Mario", "Kozic"),
-- ("Tomislav", "Kozic"),
-- ("Marko", "Dundovic"),
-- ("Denis", "Demirovski");


-- ovim queryem brojimo duplikate imena i prezimena u tablici 
select count(*) as repetitions last_name, first_name
from employee
group by last_name, first_name
having repetitions > 1;
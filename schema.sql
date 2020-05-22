DROP DATABASE IF EXISTS Employee_tracker_DB;
CREATE database Employee_tracker_DB;
USE Employee_tracker_DB;
 
CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);
CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(30,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (role_id)

);
CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
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
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marko","Dundovic", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mario", "Kozic", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tomislav", "Kozic", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Denis", "Demirovski", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Milan", "Soco", 3, 2);
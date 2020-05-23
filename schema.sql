DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;
USE employee_tracker;
 
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


select * from role cross join employee;

-- replace into employee(first_name, last_name)
-- values("Mario", "Kozic"),
-- ("Tomislav", "Kozic"),
-- ("Marko", "Dundovic"),
-- ("Denis", "Demirovski");




drop database if exists employee_trackerDB;
create database employee_trackerDB;
use employee_trackerDB;

create table department(
    id int(30) not null auto_increment,
    name varchar(30) not null,
    primary key (id)
);

create table role(
    id int(30) not null auto_increment,
    title varchar(30) not null,
    salary decimal(10, 4)not null,
    department_id int(20),
    foreign key(department_id),
    primary key (id)
);

create table employee(
    id int(30) not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int(20),
    foreign key(role_id),
    manager_id int(20),
    foreign key(manager_id),
    primary key (id)
);
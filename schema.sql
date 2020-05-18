
drop database if exists employee_trackerDB;
create database employee_trackerDB;
use employee_trackerDB;

create table department(
    id int(100) not null auto_increment,
    name varchar(100) not null,
    primary key (id)
);

create table roll(
    id int(100) not null auto_increment,
    title varchar(100) not null,
    salary decimal(10, 4)not null,
    department_id int(100) not null,
    primary key (id)
);

create table employee(
    id int(100) not null auto_increment,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    role_id int(100) not null,
    manager_id int(100),
    primary key (id)
);
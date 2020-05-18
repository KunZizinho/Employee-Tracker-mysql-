
drop database if exists employee_trackerDB;
create database employee_trackerDB;
use employee_trackerDB;

create table department(
    id int(100) not null,
    name varchar(100) not null,
    primary key (id)
);

create table roll(
    id int(100) not null,
    title varchar(100) not null,
    salary decimal(100, 4)not null,
    department_id int(id) not null,
    primary key (id)
);

create table employee(
    id int(100) not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    role_id int(department_id) not null,
    manager_id int(100) not null,
    primary key (id)
);
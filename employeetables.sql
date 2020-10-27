DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    dep_name VARCHAR(30) NULL
);

CREATE TABLE emp_role (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    dept_id INT NOT NULL,
    FOREIGN KEY (dep_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES emp_role(id)
);
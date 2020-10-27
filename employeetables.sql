DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    dep_name VARCHAR(30) NULL
);

INSERT INTO department (dep_name)
VALUES ("Engineering"), ("Sales"), ("Finances"), ("Legal");


CREATE TABLE emp_role (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    dept_id INT NOT NULL,
    FOREIGN KEY (dep_id) REFERENCES department (id)
);

INSERT INTO emp_role (title, salary, dept_id)
VALUES ("Lead Engineer", 170000, 1), ("Software Engineer", 100000, 1), ("Sales Lead", 68000, 2), ("Salesperson", 40000, 2), ("Finance Manager", 130000, 3), ("Accountant", 60000, 3),
("Legal Team Lead", 130000, 4), ("Lawyer", 70000, 4);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES emp_role(id)
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jerry", "Smith", 1), ("Mary", "Hopkins", 2), ("Erin", "Finkleburg", 3), ("Aaron", "Yoigami", 4);
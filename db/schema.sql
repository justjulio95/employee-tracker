CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
)

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(4,2) NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employees (

)
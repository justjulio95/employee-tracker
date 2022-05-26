INSERT INTO departments (name) VALUES
    ('Customer Service'),
    ('Grocery'),
    ('Meat'),
    ('Produce'),
    ('Deli'),
    ('Bakery');

INSERT INTO roles (title, salary, department_id) 
VALUES
    ('Cashier', 34000, 1),
    ('Front Service Clerk', 40000, 1),
    ('Deli Clerk', 37000, 5),
    ('Produce Clerk', 50000, 4),
    ('Meat Cutter', 80000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Firbank', 1, 1),
    ('Virginia', 'Woolf', 3, 1),
    ('Piers', 'Gaveston', 1, 0),
    ('Charles', 'LeRoi', 2, 1),
    ('Katherine', 'Mansfield', 5, 1),
    ('Dora', 'Carrington', 3, 0),
    ('Edward', 'Bellamy', 1, 0),
    ('Montague', 'Summers', 4, 1),
    ('Octavia', 'Butler', 5, 1),
    ('Unica', 'Zurn', 4, 1);
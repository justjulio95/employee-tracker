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
    ('Ronald', 'Firbank', 1, NULL),
    ('Virginia', 'Woolf', 3, 1),
    ('Piers', 'Gaveston', 1, 2),
    ('Charles', 'LeRoi', 2, 3),
    ('Katherine', 'Mansfield', 5, 4),
    ('Dora', 'Carrington', 3, 1),
    ('Edward', 'Bellamy', 5, 2),
    ('Montague', 'Summers', 4, 3),
    ('Octavia', 'Butler', 5, 4),
    ('Unica', 'Zurn', 4, 1);
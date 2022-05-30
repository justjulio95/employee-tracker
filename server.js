const cTable = require('console.table');
const inquirer = require('inquirer')
const db = require('./db/connection')

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    console.log('\nWelcome to Your Employee Database')
    promptUser();
})

const promptUser = () => {
    return inquirer.prompt([
        {
            type:'list',
            name:'objective',
            message:'What would you like to do?',
            choices:['view all departments', 'view all roles', 'view all employees', 
            'add a department', 'add a role', 'add an employee', 
            'update an employee role', 'exit']
        }
    ])
    .then(userChoice => {
        switch(userChoice.objective) {
            case 'view all departments':
                displayAllDepartments()
                break;
            case 'view all roles':
                displayAllRoles();
                break;
            case 'view all employees':
                displayAllEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break
            case 'add an employee':
                addEmployee()
                break;
            case 'update an employee role':
                updateEmployee()
                break;
            case 'exit':
                process.exit();
        }
    })
}

function displayAllDepartments() {
    console.log("\nBelow are the listed departments...\n")
    db.query(`SELECT * FROM departments`, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.table(result)
        promptUser();
    })
}

function displayAllRoles() {
    console.log("Below are the listed roles...\n")
    
    const sql = `SELECT roles.title AS job_title, roles.id AS id, departments.name AS department, 
    roles.salary AS salary FROM roles JOIN departments ON departments.id = roles.department_id`

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.table(result);
        promptUser();
    })
}

function displayAllEmployees() {
    console.log("Below are the listed employees...\n")
    const sql = `SELECT e.id AS employee_id, e.last_name AS last_name,
    e.first_name AS first_name,roles.title AS job_title, departments.name AS department,
    roles.salary AS salary, CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employees e
    JOIN roles ON roles.id = e.role_id
    JOIN departments ON departments.id = roles.department_id
    LEFT JOIN employees m ON m.id = e.manager_id
    ORDER BY e.id;`

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.table(result);
        promptUser();
    })
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            type:'input',
            name:'department',
            message:"What is the name of the department you would like to add?",
            validate: answer => {
                if (answer) {
                    return true;
                }
                console.log("\nPlease provide the name of the department you would like to add.")
                return false;
            }
        }
    ])
    .then(input => {
        const sql = `INSERT INTO departments (name) VALUES(?)`;
        const param = [input.department];
        
        db.query(sql, param, (err, result) => {
            if (err){
                console.log(err)
            }
            console.log(`\nThank you. I'll be sure to add the ${input.department} Department to your database.`)
            promptUser();
        })
    })
}

const addRole = () => {
    return db.promise().query(
        `SELECT departments.id, departments.name FROM departments`
    )
    .then(([departments]) => {
        let departmentChoices = departments.map(({
            id,
            name
        }) => ({
            name:name,
            value:id
        }))

        inquirer.prompt([
            {
                type:'input',
                name:'role',
                message:"What is the role you would like to add?",
                validate: answer => {
                    if (answer) {
                        return true;
                    }
                    console.log("\nPlease provide the name of the role you would like to add.")
                    return false;
                }
            },
            {
                type:'list',
                name:'department',
                message:'What department does this role belong in?',
                choices: departmentChoices
            },
            {
                type:'input',
                name:'salary',
                message: 'What is the salary for this role?',
                validate: answer => {
                    if (answer) {
                        return true;
                    }
                    console.log("\nPlease provide the salary for this position")
                    return false;
                }
            }
        ])
        .then(({role, department, salary}) => {
            db.promise().query(
                `INSERT INTO roles (title, salary, department_id) 
                VALUES (?,?,?)`,
                [role, salary, department], 
                (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
            console.log("Thank you. I'll add the new role to the database")
            promptUser();
        })
    })
}

const addEmployee = () => {
    return db.promise().query(
        `SELECT roles.id, roles.title FROM roles`
    )
    .then(([roles]) => {
        let roleChoices = roles.map(({
            id,
            title
        }) => ({
            name:title,
            value:id
        }))

        db.promise().query(
            `SELECT E.id, CONCAT(E.first_name, ' ', E.last_name) AS manager FROM employees E`
        )
        .then(([manager]) => {
            let managerChoices = manager.map(({
                id,
                manager
            }) => ({
                name:manager,
                value:id
            }))

            inquirer.prompt([
                {
                    type:'input',
                    name:'empFirst',
                    message:'What is the first name of the employee you would like to add?',
                    validate: answer => {
                        if (answer) {
                            return true;
                        }
                        console.log("\nPlease provide the employee's first name")
                    }
                },
                {
                    type:'input',
                    name:'empLast',
                    message:'What is the last name of the employee you would like to add?',
                    validate: answer => {
                        if (answer) {
                            return true;
                        }
                        console.log("\nPlease provide the employee's last name")
                    }
                },
                {
                    type:'list',
                    name:'role_title',
                    message:'What role is the employee taking?',
                    choices:roleChoices
                },
                {
                    type:'list',
                    name:'manager',
                    message:"Who will be this new employee's manager?",
                    choices:managerChoices
                }
            ])
            .then(({empFirst, empLast, role_title, manager}) => {
                db.promise().query(
                    `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                    VALUES (?,?,?,?)`,
                    [empFirst, empLast, role_title, manager],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                    }
                )
                console.log(`I have successfully added ${empFirst} ${empLast} to the database`);
                promptUser();
            })
        })
    })
}

const updateEmployee = () => {
    return db.promise().query(
        `SELECT E.id, CONCAT(E.first_name, ' ', E.last_name) AS employee FROM employees E`
    )
    .then(([employees]) => {
        let employeeList = employees.map(({
            id,
            employee
        }) => ({
            value:id,
            name:employee
        }))

        db.promise().query(
            `SELECT roles.id, roles.title FROM roles`
        )
        .then(([roles]) => {
            let rolesList = roles.map(({
                id,
                title
            }) => ({
                value:id,
                name:title
            }))

            inquirer.prompt([
                {
                    type:'list',
                    name:'employee',
                    message:'Which employee would you like to update?',
                    choices:employeeList
                },
                {
                    type:'list',
                    name:'updatedRole',
                    message:'What role will they be taking?',
                    choices:rolesList
                }
            ])
            .then(({employee, updatedRole}) => {
                db.promise().query(
                    `UPDATE employees SET role_id = ?
                    WHERE id = ?`,
                    [updatedRole, employee], 
                    (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                    }
                )
                console.log('Successfully updated')
                promptUser();
            })
        })
    })
}
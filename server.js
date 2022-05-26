const cTable = require('console.table');
const figlet = require('figlet');
const inquirer = require('inquirer')
const mysql = require('mysql2')
const db = require('./db/connection')

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    welcome();
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
                console.log('displaying all departments');
                displayAllDepartments()
                break;
            case 'view all roles':
                console.log('displaying all roles');
                displayAllRoles();
                break;
            case 'view all employees':
                console.log('displaying all employees');
                displayAllEmployees();
                break;
            case 'add a department':
                console.log("Let's add a department");
                addDepartment();
                break;
            case 'add a role':
                console.log("Let's add a role");
                addRole();
                break
            case 'add an employee':
                console.log("Let's add an employee");
                addEmployee()
                break;
            case 'update an employee role':
                console.log("Let's update an employee's role");
                updateEmployee()
                break;
            case 'exit':
                process.exit();
        }
    })
}

function displayAllDepartments() {
    console.log("Below are the listed departments")
}

function displayAllRoles() {
    console.log("Below are the listed roles")
}

function displayAllEmployees() {
    console.log("Below are the listed employees")
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
        console.log(`\nThank you. I'll be sure to add the ${input.department} Department to your database.`)
        promptUser();
    })
}

const addRole = () => {
    return inquirer.prompt([
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
        }
    ])
    .then(input => {
        console.log(`\nThank you. I'll be sure to add the ${input.role} Role to your database.`)
        promptUser();
    })
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type:'input',
            name:'empFirstName',
            message:"What is the first name of the employee you would like to add?",
            validate: answer => {
                if (answer) {
                    return true;
                }
                console.log("\nPlease provide the name of the employee you would like to add.")
                return false;
            }
        },
        {
            type:'input',
            name:'empLastName',
            message:"What is the last name of the employee you would like to add?",
            validate: answer => {
                if (answer) {
                    return true;
                }
                console.log("\nPlease provide the employee's last name. ")
            }
        }
    ])
    .then(input => {
        console.log(`${input.empFirstName} ${input.empLastName} will be added to the database.`);
        promptUser();
    })
}

function welcome() {
    const welcome = figlet.text('Welcome to Your Employee Database', {
        font:'Standard',
        horizontalLayout:'fitted',
        verticalLayout:'fitted',
        width: 70,
        whitespaceBreak: true
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    })
}